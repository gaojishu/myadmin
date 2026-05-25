'use client'
import React, { useEffect, useState } from 'react';
import { Button, Form, Image, Input, Space } from 'antd';
import { useRouter } from 'next/navigation';
import type { FormProps } from 'antd';
import type { AuthLoginRequest, CaptchaCreate } from '@/types';
import { authLogin } from '@/services/auth';
import { useDispatch } from 'react-redux';
import { authLoginStateUpdate } from '@/store/reducers/AuthLoginSlice';
import { captchaCreate } from '@/services';

type FieldType = AuthLoginRequest;


export default function Page() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [captcha, setCaptcha] = useState<CaptchaCreate>();

    const authLoginForm: AuthLoginRequest = {
        username: process.env.NEXT_PUBLIC_DEFAULT_USERNAME || '',
        password: process.env.NEXT_PUBLIC_DEFAULT_PASSWORD || '',
        captchaCode: '',
        captchaUuid: ''
    };
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const data = await authLogin(values);

        return
        dispatch(authLoginStateUpdate(data));

        router.push('/');
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // 加载验证码的方法
    const refreshCaptcha = async () => {
        const data = await captchaCreate(); // 对应后端返回的 CaptchaResponse
        form.setFieldValue('captchaUuid', data.uuid);
        setCaptcha(data)
    };

    useEffect(() => {
        const initCaptcha = async () => {
            await refreshCaptcha();
        };
        initCaptcha();
    }, []);

    return (

        <div className="flex items-center  justify-center h-screen w-screen">
            <div className='w-100'>
                <Form<AuthLoginRequest>
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    form={form}
                    initialValues={authLoginForm}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item<FieldType>
                        name="captchaUuid"
                    >
                        <Input hidden />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="用户名"
                        name="username"

                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item<FieldType>
                        name="captchaCode"
                        label="验证码"
                        rules={[{ required: true, message: 'Please input your captcha code!' }]}

                    >
                        <Space.Compact style={{ width: '100%' }}>
                            <Input placeholder="验证码" />

                            <Space.Addon>
                                <Image
                                    preview={false}
                                    src={captcha?.imageBase64Data}
                                    alt=''
                                    onClick={refreshCaptcha}
                                />
                            </Space.Addon>
                        </Space.Compact>

                    </Form.Item>


                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>

    );
};

