'use client'

import { usePathname, useRouter } from 'next/navigation';
import { Dropdown, type MenuProps, Tabs } from "antd";
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useDispatch } from 'react-redux';
import { clearTabItems, removeTabItem, TabItem } from '@/store/reducers/TabPageSlice';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export default function TabPage() {
    const router = useRouter();
    const pathname = usePathname().replace(/\/+$/, "");
    const dispatch = useDispatch();

    const tabsItems = useSelector((state: RootState) => state.tabPage.tabItems);
    const homeTabKey = tabsItems[0]?.key || '';
    const normalizeTabPath = (tabKey?: string) => tabKey && tabKey.trim() ? tabKey : '/';

    const items: MenuProps['items'] = [
        {
            label: '关闭全部',
            key: 'closeAll',
            disabled: tabsItems.length <= 1
        },
    ];


    const handlerRemove = (targetKey: TargetKey | string) => {
        dispatch(removeTabItem(targetKey.toString()));

        const tabItem = routeLastTab(targetKey.toString());

        router.push(normalizeTabPath(tabItem?.key));
    };

    const onClick: MenuProps['onClick'] = (info) => {
        info.domEvent.preventDefault();
        info.domEvent.stopPropagation();

        if (info.key === 'closeAll') {
            dispatch(clearTabItems());
            router.push(normalizeTabPath(homeTabKey));
        }
    };

    const tabsItemsCustom = tabsItems.map((item, index) => {
        {
            return {
                key: item.key,
                label: <Dropdown disabled={index == 0} onOpenChange={() => {

                }} menu={{ items, onClick }} trigger={['contextMenu']}>{item.label}</Dropdown>,
                closable: item.closable,
            };
        }
    });




    const routeLastTab = (key: string) => {
        //targetKey排除
        const newestTabItem = tabsItems
            .filter(item => item.key !== key)
            .reduce((max, item) => {
                const maxTime = max?.time ?? 0;
                const itemTime = item?.time ?? 0;
                return itemTime > maxTime ? item : max;
            }, undefined as TabItem | undefined);

        if (newestTabItem !== undefined) {
            return newestTabItem
        }
    };

    const handlerSwitchTab = (targetKey: TargetKey, event: string) => {
        if (event === 'click') {
            router.push(normalizeTabPath(targetKey.toString()));
        }
    };

    return (
        <div className="w-full px-2 pt-2 bg-white">
            <Tabs
                type="editable-card"
                activeKey={pathname}
                hideAdd={true}
                size="small"
                items={tabsItemsCustom}
                tabBarGutter={5}
                style={{ maxWidth: '100%' }}
                onTabClick={(key: string) => handlerSwitchTab(key, 'click')}
                onEdit={(targetKey) => handlerRemove(targetKey)}
            />
        </div>
    );
}