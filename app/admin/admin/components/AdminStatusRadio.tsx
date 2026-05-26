import React from 'react';
import { store } from '@/store';
import { Radio } from 'antd';

export default function AdminStatusRadio() {
    const options = store.getState().commonEnumsState.AdminStatusEnum;
    return (
        <Radio.Group
            block={true}
            optionType="button"
            options={options}
        />
    );
};
