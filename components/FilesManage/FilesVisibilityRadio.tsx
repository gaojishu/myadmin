import { Form, Radio } from 'antd';
import type { FormItemProps } from 'antd';
import { store } from '@/store';

type FilesVisibilityRadioProps = FormItemProps & {
    radioType?: 'button' | 'default';
    form?: boolean;
};

export default function FilesVisibilityRadio({
    radioType = 'default',
    form,
    ...formItemProps
}: FilesVisibilityRadioProps) {
    const optionsState = store.getState().commonEnumsState.filesVisibilityEnum;
    const options = [...optionsState];

    if (!form) {
        options.unshift({ label: '全部', value: '' });
    }

    return (
        <Form.Item {...formItemProps}>
            <Radio.Group
                optionType={radioType === 'button' ? 'button' : 'default'}
                options={options}
            />
        </Form.Item>
    );
}
