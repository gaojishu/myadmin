import { Form, Radio } from 'antd';
import type { FormItemProps } from 'antd';
import { store } from '@/store';

type FilesTypeRadioProps = FormItemProps & {
    radioType?: 'button' | 'default';
};

export default function FilesTypeRadio({
    radioType = 'default',
    ...formItemProps
}: FilesTypeRadioProps) {
    const optionsState = store.getState().commonEnumsState.filesTypeEnum;

    const options = [
        { label: '全部', value: undefined },
        ...optionsState,
    ];

    return (
        <Form.Item {...formItemProps}>
            <Radio.Group
                optionType={radioType === 'button' ? 'button' : 'default'}
                options={options}
            />
        </Form.Item>
    );
}
