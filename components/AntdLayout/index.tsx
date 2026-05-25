'use client'
import React, { useEffect } from 'react';

import { Affix, Layout, Watermark } from 'antd';
const { Sider, Content } = Layout;

import SiderLayout from './SiderLayout';
import FooterLayout from './FooterLayout';
import HeaderLayout from './HeaderLayout';
import TabPage from './TabPage';
import { authInfo, authPermission, enumsList } from '@/services';
import { store } from '@/store';
import { useSelector } from 'react-redux';

export default function AntdLayout({ children }: React.PropsWithChildren) {

    const user = useSelector(() => store.getState().authInfoState);
    useEffect(() => {
        authInfo();
        authPermission();
        enumsList();
    }, []);

    return (
        <Layout className='h-hull'>
            <Affix >
                <Sider width={'auto'}>
                    <SiderLayout />
                </Sider>
            </Affix>

            <Layout>
                <Layout>
                    <Affix >
                        <div className='shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'>
                            <HeaderLayout />
                            <TabPage />
                        </div>
                    </Affix>

                    <Content>
                        <main className='p-2'>
                            <Watermark content={user.username || '无或'}>
                                {children}
                            </Watermark>
                        </main>
                    </Content>

                </Layout>
                <Layout>
                    <FooterLayout />
                </Layout>
            </Layout>

        </Layout >
    )
}