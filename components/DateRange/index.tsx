import { DatePicker, type TimeRangePickerProps } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

type DateRangeValue = string[] | null;

type DateRangeProps = Omit<TimeRangePickerProps, 'value' | 'onChange'> & {
    value?: DateRangeValue;
    onChange?: (value: DateRangeValue) => void;
};

function toDayjsRange(value?: DateRangeValue): [Dayjs, Dayjs] | null {
    if (!value?.[0] || !value?.[1]) return null;
    const start = dayjs(value[0], DATE_FORMAT);
    const end = dayjs(value[1], DATE_FORMAT);
    if (!start.isValid() || !end.isValid()) return null;
    return [start, end];
}

export default function DateRange({
    value,
    onChange,
    ...props
}: DateRangeProps) {

    const rangePresets: TimeRangePickerProps['presets'] = [
        { label: '今日', value: [dayjs().startOf('day'), dayjs().endOf('day')] },
        { label: '昨日', value: [dayjs().add(-1, 'd').startOf('day'), dayjs().add(-1, 'd').endOf('day')] },
        { label: '本周', value: [dayjs().startOf('week'), dayjs().endOf('week')] },
        { label: '上周', value: [dayjs().subtract(1, 'week').startOf('week'), dayjs().subtract(1, 'week').endOf('week')] },
        { label: '本月', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
        { label: '上月', value: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')] },
        { label: '今年', value: [dayjs().startOf('year'), dayjs().endOf('year')] },
        { label: '去年', value: [dayjs().subtract(1, 'year').startOf('year'), dayjs().subtract(1, 'year').endOf('year')] },
    ];

    return (
        <RangePicker
            {...props}
            value={toDayjsRange(value)}
            onChange={(_, dateStrings) => {
                if (!dateStrings?.[0] || !dateStrings?.[1]) {
                    onChange?.(null);
                    return;
                }
                onChange?.(dateStrings);
            }}
            showTime={{
                defaultValue: [
                    dayjs('00:00:00', 'HH:mm:ss'),
                    dayjs('23:59:59', 'HH:mm:ss')
                ],
            }}
            format={DATE_FORMAT}
            presets={rangePresets}
        />
    );
};
