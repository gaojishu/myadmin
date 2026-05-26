"use client";

import type { AdminUpdate } from '@/types';
import { Card, Checkbox, Col, Form, Input, Row } from 'antd';
import AdminStatusRadio from '../components/AdminStatusRadio';
import { useWatch } from 'antd/es/form/Form';
import AntdLayout from '@/components/AntdLayout';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { adminDetail, adminUpdate } from '@/services';


export default function Page() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const router = useRouter();
    const [backState, setBackState] = useState<boolean>(true)

    const [form] = Form.useForm<AdminUpdate>();

    // 在组件顶部
    const permissionKey = useWatch('permissionKey', form) as string[] | undefined;

    const [adminFormData, setAdminFormData] = useState<AdminUpdate>()

    useEffect(() => {
        const fetchData = async () => {

            const data = await adminDetail(id as string);

            setAdminFormData({
                ...data
            });

            form.setFieldsValue({
                ...data,
                permissionKey: data?.permissionKey || []
            });
        };

        fetchData();
    }, [id]);

    const handlerReset = () => {
        form.setFieldsValue({
            ...adminFormData,
            permissionKey: adminFormData?.permissionKey || []
        });
    }

    const handlerUpdateSubmit = async (values: AdminUpdate) => {
        await adminUpdate(values);
        setAdminFormData(values);
        if (backState) {
            router.back();
        }
        return true;
    };

    return (
        <AntdLayout>
            <Card title={`编辑管理员[ID:${id}]`}>
                <Form<AdminUpdate>
                    name="AdminUpdate"
                    form={form}
                    onReset={handlerReset}
                    onFinish={handlerUpdateSubmit}
                    labelCol={{
                        xs: { span: 24 },
                        sm: { span: 6 },
                    }}
                    labelAlign='right'
                    layout='horizontal'
                    className='max-h-[500px] overflow-y'
                >
                    <Form.Item
                        name="id"
                        hidden
                    >
                        <Input />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item
                                        name="username"
                                        label="用户名"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        name="password"
                                        label="密码"
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        name="status"
                                        label="状态"
                                        rules={[{ required: true, message: '请选择' }]}
                                    >
                                        <AdminStatusRadio />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        name="nickname"
                                        label="昵称"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        name="mobile"
                                        label="手机号"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        name="email"
                                        label="邮箱"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>

                        {/* <Col span={12}>
                            <Form.Item
                                name="permissionKey"
                            >

                            </Form.Item>
                        </Col> */}
                    </Row>
                </Form>
            </Card>
        </AntdLayout>
    );
};