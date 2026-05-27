"use client";
import { useEffect, useState } from 'react';
import { Select, Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import { RoleData, PermissionTree } from '@/types';
import { permissionTree, roleList } from '@/services';
import { store } from '@/store';

type PermissionTreeProps = TreeProps & {
    selectRole?: boolean;
    onSearchRole?: (role: RoleData) => void;
};

export default function PermissionTreeA({
    selectRole,
    onSearchRole,
    ...props
}: PermissionTreeProps) {

    const [permissionTreeData, setPermissionTreeData] = useState<TreeDataNode[]>([]);
    const [roleListData, setRoleListData] = useState<RoleData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const permissionTypeOption = store.getState().commonEnumsState.PermissionTypeEnum;

    const fetchRoleList = async () => {
        try {
            const data = await roleList();
            setRoleListData(data);
        } catch (error) {
            console.error('Failed to fetch role list:', error);
        }
    };

    const fetchPermissionTree = async () => {
        try {
            setLoading(true);
            const data = await permissionTree();
            const treeData = convertToTreetData(data);
            setPermissionTreeData(treeData);
        } catch (error) {
            console.error('Failed to fetch permission tree:', error);
        } finally {
            setLoading(false);
        }
    };

    const convertToTreetData = (data: PermissionTree[]): TreeDataNode[] => {
        return data.map(item => ({
            title: `${item.name} - ${permissionTypeOption.find(option => option.value === item.type)?.label}`,
            key: item.key,
            children: item.children ? convertToTreetData(item.children) : undefined,
        }));
    };

    useEffect(() => {
        // 将异步操作包装在立即执行的异步函数中
        (async () => {
            await fetchPermissionTree();
            if (selectRole) {
                await fetchRoleList();
            }
        })();
    }, [selectRole]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {
                selectRole && roleListData.length > 0 &&
                <Select
                    options={roleListData.map(item => ({
                        value: item.id.toString(),
                        label: item.name,
                    }))}
                    placeholder="请选择权限模板"
                    onChange={(value: string) => {
                        const role = roleListData.find(item => item.id === value);
                        if (role) {
                            onSearchRole?.(role);
                        }
                    }}
                />
            }
            {
                permissionTreeData.length > 0 &&
                <Tree
                    {...props}
                    treeData={permissionTreeData}
                />
            }
        </>
    );
};