'use client'
import AntdLayout from "@/components/AntdLayout";
import { Button, Card, Popconfirm, Space, Table, TableColumnsType } from "antd";
import { useCallback, useEffect, useState } from "react";
import { PermissionData, PermissionTree } from "@/types";
import { permissionCreate, permissionDelete, permissionTree, permissionUpdate } from "@/services";
import { Access } from "@/components/Access";
import { store } from "@/store";
import { ReloadOutlined } from "@ant-design/icons";
import PermissionCreateModalForm from "./components/PermissionCreateModalForm";
import PermissionUpdateModalForm from "./components/PermissionUpdateModalForm";

export default function Page() {
    const [dataSource, setDataSource] = useState<PermissionTree[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const permissionTypeEnum = store.getState().commonEnumsState.PermissionTypeEnum;
    const [permissionCreateModalOpen, setPermissionCreateModalOpen] = useState<boolean>(false);
    const [permissionCreateModalFormData, setPermissionCreateModalFormData] = useState<Partial<PermissionData>>();
    const [permissionUpdateModalOpen, setPermissionUpdateModalOpen] = useState<boolean>(false);
    const [permissionUpdateModalFormData, setPermissionUpdateModalFormData] = useState<Partial<PermissionData>>();

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await permissionTree();
            setDataSource(result);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handlerCreateSubmit = async (values: PermissionData) => {
        await permissionCreate(values);
        setPermissionCreateModalOpen(false);
        fetchData();
    };

    const handlerAdd = (record?: PermissionData) => {
        setPermissionCreateModalOpen(true);
        setPermissionCreateModalFormData({
            parentId: record?.id ?? null,
            sort: 0
        });
    };

    const handlerEdit = (record: PermissionData) => {
        setPermissionUpdateModalOpen(true);
        setPermissionUpdateModalFormData(record);
    };
    const handlerUpdateSubmit = async (values: PermissionData) => {
        await permissionUpdate(values);
        setPermissionUpdateModalOpen(false);
        fetchData();
    };

    const handlerDelete = async (record: PermissionData) => {
        await permissionDelete(record.id);
        await fetchData();
    };

    const columns: TableColumnsType<PermissionData> = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: (_, record) => (
                permissionTypeEnum.find(item => item.value === record.type)?.label
            ),
        },
        {
            title: '排序',
            dataIndex: 'sort',
            key: 'sort',
        },
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Space>
                        <Access auth='permission:create' key="permission:create">
                            <Button color="primary" variant="link" onClick={() => handlerAdd(record)}>添加子菜单</Button>
                        </Access>
                        <Access auth='permission:update' key="permission:update">
                            <Button color="default" variant="link" onClick={() => handlerEdit(record)}>编辑</Button>
                        </Access>
                        <Access auth='permission:delete' key="permission:delete">
                            <Popconfirm
                                title="删除操作"
                                description="您确认要删除吗?"
                                onConfirm={() => handlerDelete(record)}
                            >
                                <Button color="danger" variant="link">删除</Button>
                            </Popconfirm>
                        </Access>
                    </Space>
                )
            },
        },
    ];

    const toolBarRender = (
        <Space>
            <Access auth='permission:create' key="permission:create">
                <Button onClick={() => handlerAdd()} key="handlerAdd" type="primary">新增</Button>
            </Access>
            <Button onClick={() => fetchData()} key="fetchData" loading={loading}>
                <ReloadOutlined spin={loading} />
            </Button>
        </Space>
    );

    return (
        <AntdLayout>
            <PermissionCreateModalForm
                open={permissionCreateModalOpen}
                onCancel={() => setPermissionCreateModalOpen(false)}
                permissionTreeData={dataSource}
                permissionFormData={permissionCreateModalFormData}
                onOk={handlerCreateSubmit}
            />
            <PermissionUpdateModalForm
                open={permissionUpdateModalOpen}
                onCancel={() => setPermissionUpdateModalOpen(false)}
                permissionTreeData={dataSource}
                permissionFormData={permissionUpdateModalFormData}
                onOk={handlerUpdateSubmit}
            />
            <Card
                title="权限列表"
                extra={toolBarRender}
            >
                {dataSource.length > 0 && <Table
                    rowKey="id"
                    dataSource={dataSource}
                    columns={columns}
                    loading={loading}
                    pagination={false}
                    expandable={{
                        defaultExpandAllRows: false,
                    }}
                />}
            </Card>
        </AntdLayout>
    )
}