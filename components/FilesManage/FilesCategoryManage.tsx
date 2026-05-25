import React from "react";
import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { FilesCategoryData, FilesCategoryCreate, FilesCategoryUpdate } from "@/types";
import { filesCategoryDelete, filesCategoryRecords, filesCategoryCreate, filesCategoryUpdate } from "@/services/filesCategory";

type FilesCategoryManageProps = {
    fileCategoryManageOpen: boolean;
    setFileCategoryManageOpen: (state: boolean) => void;
};

type EditableCellProps = React.HTMLAttributes<HTMLElement> & {
    editing: boolean;
    dataIndex: keyof FilesCategoryData;
    title: string;
    children: React.ReactNode;
};

function EditableCell({
    editing,
    dataIndex,
    title,
    children,
    ...restProps
}: EditableCellProps) {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={dataIndex === 'name' ? [{ required: true, message: `请输入${title}` }] : []}
                >
                    <Input />
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
}

export default function FilesCategoryManage({
    fileCategoryManageOpen,
    setFileCategoryManageOpen,
}: FilesCategoryManageProps) {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState<number | null>(null);
    const [filesCategoryRecordsData, setFilesCategoryRecordsData] = useState<FilesCategoryData[]>([]);

    const loadData = useCallback(async () => {
        const data = await filesCategoryRecords();
        setFilesCategoryRecordsData(data);
    }, []);

    useEffect(() => {
        if (fileCategoryManageOpen) {
            loadData();
        }
    }, [fileCategoryManageOpen, loadData]);

    const isEditing = (record: FilesCategoryData) => record.id === editingKey;

    const edit = (record: FilesCategoryData) => {
        form.setFieldsValue({ name: record.name, remark: record.remark });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey(null);
        setFilesCategoryRecordsData((prev) => prev.filter((item) => item.id !== 0));
    };

    const handlerDelete = async (id: string) => {
        await filesCategoryDelete(id);
        await loadData();
    };

    const handlerCreateSubmit = async (values: FilesCategoryCreate) => {
        await filesCategoryCreate(values);
        await loadData();
    };

    const handlerUpdateSubmit = async (values: FilesCategoryUpdate) => {
        await filesCategoryUpdate(values);
        await loadData();
    };

    const save = async (id: number) => {
        const row = await form.validateFields();
        if (id) {
            await handlerUpdateSubmit({ id, ...row });
        } else {
            await handlerCreateSubmit(row);
        }
        setEditingKey(null);
    };

    const handleAdd = () => {
        if (editingKey !== null) {
            return;
        }
        const newRecord: FilesCategoryData = {
            id: 0,
            name: '',
            remark: '',
            createdAt: '',
            updatedAt: '',
        };
        setFilesCategoryRecordsData((prev) => [newRecord, ...prev]);
        form.setFieldsValue({ name: '', remark: '' });
        setEditingKey(0);
    };

    const columns: ColumnsType<FilesCategoryData> = [
        {
            title: '名称',
            dataIndex: 'name',
            width: 200,
            onCell: (record) => ({
                record,
                dataIndex: 'name',
                title: '名称',
                editing: isEditing(record),
            }),
        },
        {
            title: '备注',
            dataIndex: 'remark',
            ellipsis: true,
            onCell: (record) => ({
                record,
                dataIndex: 'remark',
                title: '备注',
                editing: isEditing(record),
            }),
        },
        {
            title: '操作',
            width: 160,
            render: (_, record) => {
                const editable = isEditing(record);
                if (editable) {
                    return (
                        <span>
                            <Button type="link" onClick={() => save(record.id)}>
                                保存
                            </Button>
                            <Button type="link" onClick={cancel}>
                                取消
                            </Button>
                        </span>
                    );
                }
                return (
                    <span>
                        <Button type="link" onClick={() => edit(record)}>
                            编辑
                        </Button>
                        <Popconfirm
                            title="删除操作"
                            description="您确认要删除吗?"
                            onConfirm={() => handlerDelete(record.id.toString())}
                        >
                            <Button type="link" danger>
                                删除
                            </Button>
                        </Popconfirm>
                    </span>
                );
            },
        },
    ];

    const handleCancel = () => {
        setEditingKey(null);
        setFileCategoryManageOpen(false);
    };

    const handleOk = () => {
        setEditingKey(null);
        setFileCategoryManageOpen(false);
    };

    return (
        <Modal
            title="文件分类管理"
            open={fileCategoryManageOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={800}
        >
            <Form form={form} component={false}>
                <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
                    新增
                </Button>
                <Table<FilesCategoryData>
                    rowKey="id"
                    columns={columns}
                    dataSource={filesCategoryRecordsData}
                    pagination={false}
                    components={{
                        body: { cell: EditableCell },
                    }}
                />
            </Form>
        </Modal>
    );
}
