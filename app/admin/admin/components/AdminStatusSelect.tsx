import { store } from '@/store';
import { Select, type SelectProps } from 'antd';

export default function AdminStatusSelect(props: SelectProps) {
    const options = store.getState().commonEnumsState.AdminStatusEnum;

    return (
        <Select
            placeholder="请选择状态"
            allowClear
            options={options}
            style={{ width: '100%' }}
            {...props}
        />
    );
}
