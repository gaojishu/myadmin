import React from 'react';
import {
    Radio,
} from 'antd';
import type { RadioGroupProps } from 'antd';
import { store } from '@/store';

export default function PermissionTypeRadio({
    ...props
}: RadioGroupProps) {
    const permissionTypeOption = store.getState().commonEnumsState.PermissionTypeEnum;
    return (
        <Radio.Group
            options={permissionTypeOption}
            optionType="button"
            {...props}
        />
    );
};
