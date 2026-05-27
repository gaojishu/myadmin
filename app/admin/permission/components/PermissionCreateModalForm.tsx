import type { PermissionData, PermissionTree } from '@/types';
import { Col, Form, Input, InputNumber, Modal, Row } from 'antd';
import { useEffect } from 'react';
import PermissionTreeSelect from './PermissionTreeSelect';
import PermissionTypeRadio from './PermissionTypeRadio';

type PermissionModalFormProps = {
    open: boolean;
    onCancel: () => void;
    onOk?: (values: PermissionData) => void;
    permissionTreeData: PermissionTree[];
    permissionFormData?: Partial<PermissionData>;
}

export default function PermissionCreateModalForm({
    open,
    onCancel,
    onOk,
    permissionTreeData,
    permissionFormData,
}: PermissionModalFormProps) {
    const [form] = Form.useForm<PermissionData>();

    // 监听弹窗打开状态和数据变化
    useEffect(() => {
        form.setFieldsValue({
            ...permissionFormData
        });
    }, [permissionFormData, open, form]);

    // 点击确认时的处理函数
    const handleOk = async () => {
        try {
            // 触发触发表单校验并获取数据
            const values = await form.validateFields();

            onOk?.(values);
        } catch (error) {
            console.log('表单校验失败:', error);
        }
    };

    // 点击取消时的处理函数
    const handleCancel = () => {
        form.resetFields();
        onCancel?.();
    };

    return (
        <Modal
            title="新增权限"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            forceRender
        >
            {/* 核心修正：添加 Form 组件包裹 */}
            <Form
                form={form}
                layout="vertical" // 建议垂直布局，更适合一行多列
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="上级权限"
                            name="parentId"
                        >
                            <PermissionTreeSelect
                                placeholder="请选择上级权限"
                                allowClear
                                treeDefaultExpandAll
                                permissionTreeData={permissionTreeData}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="名称"
                            name="name"
                            rules={[
                                { required: true, message: '请输入名称' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="权限类型"
                            name="type"
                            rules={[
                                { required: true, message: '请选择权限类型' },
                            ]}
                        >
                            <PermissionTypeRadio />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="排序"
                            name="sort"
                            rules={[
                                { required: true, message: '请输入排序' },
                            ]}
                        >
                            <InputNumber min={0} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="path"
                            label="菜单路径"
                        >
                            <Input placeholder="请输入菜单路径" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="code"
                            label="权限标识"
                        >
                            <Input placeholder="请输入权限标识" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="icon"
                            label="图标"
                        >
                            <Input placeholder="请输入图标" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="remark"
                            label="备注"
                        >
                            <Input placeholder="请输入备注" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};
