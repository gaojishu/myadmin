"use client";

import type { AdminCreate } from '@/types';
import { Card, Checkbox, Col, Form, Input, Row } from 'antd';
import AdminStatusRadio from '../components/AdminStatusRadio';
import { useWatch } from 'antd/es/form/Form';
import AntdLayout from '@/components/AntdLayout';
import { adminCreate } from '@/services';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function Page() {

    const router = useRouter();
    const [form] = Form.useForm<AdminCreate>();
    const [backState, setBackState] = useState<boolean>(true)
    // 在组件顶部
    const permissionKey = useWatch('permissionKey', form) as string[] | undefined;

    const adminInitFormData: AdminCreate = {
        username: '',
        password: '',
        email: '',
        nickname: '',
        mobile: '',
        status: '',
        permissionKey: []
    }

    // 重置不能触发  需要手动处理
    const handlerReset = () => {
        form.setFieldsValue({
            ...adminInitFormData
        });
    }


    const handlerCreateSubmit = async (values: AdminCreate) => {
        await adminCreate(values);
        if (backState) {
            router.back();
        }
        return true;
    };

    return (
        <AntdLayout>
            <Card title="新增管理员">
                <Form<AdminCreate>
                    name="AdminCreate"
                    form={form}
                    onReset={handlerReset}
                    onFinish={handlerCreateSubmit}
                    // submitter={{
                    //     // 自定义渲染按钮
                    //     render: (props, doms) => {
                    //         return [
                    //             ...doms, // 保留默认的“提交”和“重置”按钮
                    //             <Checkbox
                    //                 key={'1'}
                    //                 checked={backState} // 使用 checked 控制状态
                    //                 onChange={(e) => {
                    //                     setBackState(e.target.checked);
                    //                 }}
                    //             >
                    //                 成功后返回上一页
                    //             </Checkbox>
                    //         ];
                    //     },
                    // }}
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
                                        rules={[{ required: true, message: '请输入' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        name="password"
                                        label="密码"
                                        rules={[
                                            { required: true, message: '请输入' },
                                        ]}
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
                                
                            </ProForm.Item>
                        </Col> */}
                    </Row>
                </Form>
            </Card>
        </AntdLayout>
    );
};