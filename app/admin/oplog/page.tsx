'use client'
import AntdLayout from '@/components/AntdLayout';
import { Card, Divider, Table, TableColumnsType, TableProps, Space, Button } from 'antd';
import { OpLogData, Pageable, OpLogSearchParams, PageQuery } from '@/types';
import { opLogExport, opLogPage } from '@/services';
import { useCallback, useEffect, useState } from 'react';
import SearchForm from './components/SearchFrom';
import { SorterResult } from 'antd/es/table/interface';
import { ReloadOutlined } from '@ant-design/icons';

export default function Page() {
    const [apiResult, setApiResult] = useState<Pageable<OpLogData>>();
    const [loading, setLoading] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useState<OpLogSearchParams | undefined>();
    const [page, setPage] = useState<PageQuery | undefined>();

    const fetchData = useCallback(async (params?: OpLogSearchParams, pageQuery?: PageQuery) => {
        setLoading(true);
        try {
            const result = await opLogPage(params, pageQuery);
            setApiResult(result);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(searchParams);
    }, [searchParams, fetchData]);

    const handleSearch = (values: OpLogSearchParams) => {
        setSearchParams(values);
        setPage(undefined);
    };

    const handleReset = () => {
        setSearchParams(undefined);
        setPage(undefined);
    };
    const columns: TableColumnsType<OpLogData> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '管理员ID',
            dataIndex: 'adminId',
            key: 'adminId',
        },
        {
            title: 'IP',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: '接口',
            dataIndex: 'uri',
            key: 'uri',
            render: (text, record) => {
                return record.method + ' ' + record.uri;
            },
        },
        {
            title: '时长',
            dataIndex: 'duration',
            key: 'duration',
            render: (text, record) => {
                return record.duration ? record.duration + 'ms' : '-';
            },
        },
        {
            title: '参数',
            dataIndex: 'params',
            key: 'params',
        },
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: '更新时间',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
        },
    ];

    const handleTableChange: TableProps<OpLogData>['onChange'] = (pagination, _, sorter) => {
        const sort = sorter as SorterResult<OpLogData>;
        const pageQuery = { page: pagination.current, size: pagination.pageSize };
        setPage(pageQuery);
        fetchData(searchParams, pageQuery);
    };

    const toolBarRender = (
        <Space>
            <Button type="primary" onClick={() => opLogExport(searchParams)} key="opLogExport">导出表格</Button>
            <Button loading={loading} onClick={() => fetchData(searchParams, page)} key="fetchData">
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
                title="操作日志列表"
                extra={toolBarRender}
            >
                <Table
                    rowKey="id"
                    dataSource={apiResult?.list}
                    columns={columns}
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
    )
}