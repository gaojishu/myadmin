import PermissionTree from '@/app/admin/permission/components/PermissionTreeA';
import type { RoleData } from '@/types';
import { ReloadOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input, Space } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import { useEffect } from 'react';
const { TextArea } = Input;


type RoleFormProps = FormProps<RoleData> & {
    roleFormData: Partial<RoleData>;
};

export default function RoleForm({
    roleFormData,
    ...props
}: RoleFormProps) {
    // 获取 form 实例
    const [form] = Form.useForm();

    // 在组件顶部
    const permissionKey = useWatch('permissionKey', form) as string[] | undefined;

    useEffect(() => {
        if (roleFormData?.id) {
            form.setFieldsValue({ ...roleFormData });
        } else {
            form.resetFields();
        }
    }, [roleFormData?.id, roleFormData, form]);


    // 重置不能触发  需要手动处理
    const handleReset = () => {
        if (roleFormData?.id) {
            form.setFieldsValue({
                ...roleFormData,
                permissionKey: roleFormData?.permissionKey,
            });
        } else {
            form.resetFields();
        }
    }

    return (
        <Form<RoleData>
            form={form}
            onReset={handleReset}
            {...props}
        >
            <Form.Item
                name="id"
                hidden
            >
                <Input hidden />
            </Form.Item>
            <Form.Item
                label="模板名称"
                name="name"
                rules={[{ required: true, message: '请输入模板名称' }]}
            >
                <Input placeholder="请输入模板名称" />
            </Form.Item>
            <Form.Item
                label="备注"
                name="remark"
            >
                <TextArea rows={2} />
            </Form.Item>
            <Form.Item
                label="选择权限"
                name="permissionKey"
            >
                <PermissionTree
                    checkable
                    defaultExpandAll
                    height={333}
                    onCheck={(checkedKeys) => {
                        const strKey = checkedKeys as string[];
                        form.setFieldsValue({ permissionKey: strKey });
                    }}
                    checkedKeys={permissionKey || roleFormData?.permissionKey || []}
                />
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                    <Button htmlType="reset" onClick={handleReset}>
                        <ReloadOutlined />
                        重置
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};