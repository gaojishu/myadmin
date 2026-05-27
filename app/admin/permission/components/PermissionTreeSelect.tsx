import { useMemo } from 'react';
import { TreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd';
import { PermissionTree } from '@/types';

// 定义TreeSelect数据项类型
type TreeSelectItem = {
    title: string;
    value: number | string;
    children?: TreeSelectItem[];
};

type PermissionTreeSelectProps = TreeSelectProps & {
    permissionTreeData: PermissionTree[];
};

export default function PermissionTreeSelect({
    permissionTreeData,
    ...props
}: PermissionTreeSelectProps) {
    const treeData = useMemo(() => {
        const convertToTreeSelectData = (data: PermissionTree[]): TreeSelectItem[] => {
            return data.map(item => ({
                title: item.name,
                value: item.id,
                children: item.children ? convertToTreeSelectData(item.children) : undefined,
            }));
        };

        return convertToTreeSelectData(permissionTreeData);
    }, [permissionTreeData]);

    return (
        <>
            <TreeSelect
                {...props}
                treeData={treeData}
            />
        </>
    );
};