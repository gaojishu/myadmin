'use client'
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Divider, Space, Table, TableColumnsType, TableProps } from 'antd';
import AntdLayout from '@/components/AntdLayout';
import { adminPage } from '@/services';
import type { AdminData, Pageable, AdminSearchParams, PageQuery } from '@/types';
import { store } from '@/store';
import { Access } from '@/components/Access';
import { useRouter } from 'next/navigation';
import { ReloadOutlined } from '@ant-design/icons';
import SearchForm from './components/SearchFrom';
import { SorterResult } from 'antd/es/table/interface';

export default function Page(): React.ReactElement {
    const adminStatusEnum = store.getState().commonEnumsState.AdminStatusEnum;
    const [apiResult, setApiResult] = useState<Pageable<AdminData>>();
    const [loading, setLoading] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useState<AdminSearchParams | undefined>();
    const [page, setPage] = useState<PageQuery | undefined>();

    const router = useRouter()

    const fetchData = useCallback(async (params?: AdminSearchParams, pageQuery?: PageQuery) => {
        setLoading(true);
        try {
            const result = await adminPage(params, pageQuery);
            setApiResult(result);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(searchParams);
    }, [searchParams, fetchData]);

    const handleSearch = (values: AdminSearchParams) => {
        setSearchParams(values);
        setPage(undefined);
    };

    const handleReset = () => {
        setSearchParams(undefined);
        setPage(undefined);
    };

    const column: TableColumnsType<AdminData> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '账号',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                adminStatusEnum.find(item => item.value === record.status)?.label
            ),
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <Space>
                    <Button type="link" onClick={() => handlerEdit(record)}>编辑</Button>
                </Space>
            ),
        },
    ];

    const handlerEdit = (record: AdminData) => {
        router.push(`admin/update?id=${record.id}`)
    };

    const handlerAdd = () => {
        router.push(`admin/create`)
    };

    const handleTableChange: TableProps<AdminData>['onChange'] = (pagination, _, sorter) => {
        const sort = sorter as SorterResult<AdminData>;
        const pageQuery = { page: pagination.current, size: pagination.pageSize };
        setPage(pageQuery);
        fetchData(searchParams, pageQuery);
    };

    const toolBarRender = (
        <Space>
            <Access auth='admin:create' key={"admin:create"}>
                <Button onClick={() => handlerAdd()} key="handlerAdd">新增</Button>
            </Access>
            <Button onClick={() => fetchData(searchParams, page)} key="fetchData" loading={loading}>
                <ReloadOutlined spin={loading} />
            </Button>
        </Space>
    );

    return (
        <AntdLayout>
            <SearchForm
                onSearch={handleSearch}
                onReset={handleReset}
                loading={loading}
            />
            <Divider size="small" />
            <Card
                title="管理员列表"
                extra={toolBarRender}
            >
                <Table
                    rowKey="id"
                    dataSource={apiResult?.list}
                    columns={column}
                    loading={loading}
                    pagination={{
                        current: apiResult?.page,
                        pageSize: apiResult?.size,
                        total: apiResult?.total,
                        showSizeChanger: true,
                    }}
                    onChange={handleTableChange}
                    scroll={{ x: 'max-content' }}
                />

            </Card>

        </AntdLayout>
    );
};

