'use client';

import { Image, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useMemo } from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import AntdThemeConfig from '@/config/theme.config';
import { useRouter } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];
export default function SiderLayout() {
    const router = useRouter();

    const currentKey1 = useSelector((state: RootState) => state.tabPage.currentKey1);
    const currentKey2 = useSelector((state: RootState) => state.tabPage.currentKey2);
    const permission = useSelector((state: RootState) => state.authPermission.permission ?? []);
    const permissionMenuTree = useSelector((state: RootState) => state.authPermission.permissionTree ?? []);

    // 1. 直接通过 useMemo 获取所有派生状态，去掉额外的 useState
    const { menu1Index, menuTree2 } = useMemo(() => {
        
        const index = permissionMenuTree.findIndex(item => item?.key?.toString() === currentKey1?.toString());
        const currentMenu1 = permissionMenuTree[index];

        const children = (currentMenu1 && 'children' in currentMenu1)
            ? (currentMenu1.children as MenuItem[])
            : [];
            
        return {
            menu1Index: index,
            menuTree2: children
        };
    }, [currentKey1, permissionMenuTree]);

    const handlerSwitchMenu1 = (index: number) => {
        const targetMenu = permissionMenuTree[index];
     
        if (targetMenu && 'children' in targetMenu && targetMenu.children?.[0]) {
            // 找到第一个子节点的 key
            const firstChildKey = targetMenu.children[0].key;
            const permissionItem = permission.find(item => item.key.toString() === firstChildKey?.toString());
            router.push(permissionItem?.path || '/');
        } else {
            router.push('/');
        }
    };

    // 格式化选中的 Key 数组
    const selectedKeys = useMemo(() =>
        currentKey2,
        [currentKey2]
    );

    return (
        <div className='h-screen flex flex-col'>
            <div className="flex items-center h-16 p-2 bg-gray-100 border-r-gray-200 shrink-0">
                <div>无或</div>
            </div>

            <div className="flex flex-1 overflow-auto">
                {/* 左侧自定义一级导航 */}
                <div className="flex-shrink-0 min-h-full w-17 bg-[#001529] text-white relative">
                    <div
                        className="absolute left-0 top-0 h-[60px] w-full transition-all duration-300 ease-in-out z-0"
                        style={{
                            backgroundColor: AntdThemeConfig?.token?.colorPrimary,
                            transform: `translateY(${menu1Index >= 0 ? menu1Index * 60 : -60}px)`,
                            opacity: menu1Index >= 0 ? 1 : 0
                        }}
                    />
                    {permissionMenuTree.map((item: any, index) => (
                        <div
                            key={item.key || index}
                            onClick={() => handlerSwitchMenu1(index)}
                            className="relative z-10 h-[60px] flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
                        >
                            {item.label}
                        </div>
                    ))}
                </div>

                {/* 右侧 AntD 二级导航 */}
                <div className="min-h-full bg-white flex-1 border-l border-gray-100">
                    <Menu
                        mode="inline"
                        selectedKeys={selectedKeys}
                        theme="light"
                        items={menuTree2}
                        onClick={({ key }) => {
                            const item = permission.find(p => p.key.toString() === key);
                            if (item?.path) router.push(item.path);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
