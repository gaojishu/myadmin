'use client'
import React, { useEffect, useState, useCallback } from 'react';
import { Card, Col, Popconfirm, Row, Tabs, Typography } from 'antd';
import type { TabsProps } from 'antd';
import AntdLayout from '@/components/AntdLayout';
import type { RoleData, RoleStore, TabsTargetKey } from '@/types';
import RoleForm from './components/RoleForm';
import { DeleteOutlined } from '@ant-design/icons';
import { roleDelete, roleList, roleCreate, roleUpdate } from '@/services/role';

const EMPTY_ROLE_FORM: Partial<RoleData> = {};

export default function Page(): React.ReactElement {

    const [roleId, setRoleId] = useState<string>("");
    const [roleRecordsData, setRoleRecordsData] = useState<RoleData[]>([]);
    const [roleTabsData, setRoleTabsData] = useState<TabsProps['items']>([]);
    const [activeKey, setActiveKey] = useState('');

    const [roleFormData, setRoleFormData] = useState<Partial<RoleData>>()

    const fetchRoleList = useCallback(async () => {
        const data = await roleList();
        const tabsItems = data.map((item: RoleData) => ({
            key: item.id.toString(),
            label: (
                <Typography.Text
                    ellipsis={{ tooltip: item.name }}
                    style={{ maxWidth: 100 }}
                >
                    {item.name}
                </Typography.Text>
            ),
        }));
        setRoleTabsData(tabsItems);
        setRoleRecordsData(data);
    }, []);

    useEffect(() => {
        fetchRoleList();
    }, [fetchRoleList]);

    useEffect(() => {
        setActiveKey(roleFormData?.id?.toString() || "");
    }, [roleFormData]);

    const handlerDelete = async () => {
        await roleDelete(roleId.toString());
        fetchRoleList();
        if (roleId.toString() == activeKey) {

        }
    };

    const handlerSubmit = async (values: RoleStore) => {
        let data = null
        if (values.id) {
            data = await roleUpdate(values);
        } else {
            data = await roleCreate(values);
        }

        fetchRoleList();
        setRoleFormData(data);
    };

    const handlerEdit = (
        targetKey: TabsTargetKey,
        action: 'add' | 'remove',
    ) => {
        if (action === 'remove') {
            setRoleId(targetKey?.toString() || "");
        }
        if (action === 'add') {
            setRoleFormData(undefined);
        }
    }

    const handlerSwitchTab = (key: string) => {
        const selectedRole = roleRecordsData.find(item => item.id.toString() === key);
        if (selectedRole) {
            setRoleFormData(selectedRole);
        } else {
        }
    };


    return (
        <AntdLayout>
            <Card title="">
                <Row>
                    <Col span={4}>
                        <Tabs
                            tabBarGutter={5}
                            activeKey={activeKey}
                            type="editable-card"
                            tabPlacement='start'
                            style={{ width: '100%' }}
                            className="role-tabs"
                            removeIcon={
                                <Popconfirm
                                    title="删除操作"
                                    description="您确认要删除吗?"
                                    onConfirm={() => handlerDelete()}
                                >
                                    <DeleteOutlined />
                                </Popconfirm>
                            }
                            onEdit={handlerEdit}
                            items={roleTabsData}
                            defaultActiveKey={activeKey}
                            onTabClick={(key: string) => handlerSwitchTab(key)}
                        />
                    </Col>
                    <Col span={20}>
                        <Card title={roleFormData?.id ? "编辑模板" : "新增模板"}>
                            <RoleForm
                                key={roleFormData?.id?.toString() ?? '__new__'}
                                onFinish={(values) => handlerSubmit(values)}
                                roleFormData={roleFormData ?? EMPTY_ROLE_FORM}
                            />
                        </Card>

                    </Col>
                </Row>
            </Card>

        </AntdLayout>
    );
};