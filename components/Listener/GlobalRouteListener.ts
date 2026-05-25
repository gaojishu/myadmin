'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { addTabItem, setCurrentKey1, setCurrentKey2 } from '@/store/reducers/TabPageSlice';



export function GlobalRouteListener() {

    const pathname = usePathname().replace(/\/+$/, "");
    const dispatch = useDispatch();
    const permission = useSelector((state: RootState) => state.authPermission.permission ?? []);

    useEffect(() => {
        if (!permission || permission.length === 0) return;

        const currentPermission = permission.find(item => item.path === pathname);

        if (currentPermission) {
            const key = currentPermission && currentPermission.key.split(',') || [];

            // 更新一级菜单选中状态
            dispatch(setCurrentKey1(key[0]));

            // 更新二级菜单选中状态
            dispatch(setCurrentKey2([key[0], currentPermission.key]));

            // 添加或更新对应标签页
            dispatch(addTabItem(
                {
                    key: currentPermission?.path || '',
                    label: currentPermission?.name,
                    currentKey2: [key[0], currentPermission.key],
                    currentKey1: key[0],
                }
            ));
        }

        console.log('监听路由变化：', pathname);

    }, [pathname, permission]);

    return null; // 不渲染任何内容
}

