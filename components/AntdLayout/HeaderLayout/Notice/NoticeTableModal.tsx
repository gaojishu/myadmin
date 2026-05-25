'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { noticePage } from '@/services';
import type { NoticeData } from '@/types';
import DateRange from '@/components/DateRange';
import { Button, Drawer, Form, Input, Space, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { SorterResult, SortOrder } from 'antd/es/table/interface';

type NoticeTableModalProps = {
    noticeTableModalOpen: boolean;
    setNoticeTableModalOpen: (state: boolean) => void;
};

export default function NoticeTableModal({
    noticeTableModalOpen,
    setNoticeTableModalOpen,
}: NoticeTableModalProps): React.ReactElement {
    const [searchForm] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState<NoticeData[]>([]);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [sort, setSort] = useState<Record<string, SortOrder>>({});
    const [searchCollapsed, setSearchCollapsed] = useState(true);

    const fetchData = useCallback(async (
        page = pagination.current,
        pageSize = pagination.pageSize,
        nextSort = sort,
    ) => {
        setLoading(true);
        try {
            const values = searchForm.getFieldsValue();
            const params = {
                ...values,
                current: page,
                pageSize,
            };
            const data = await noticePage(params, nextSort);
            setDataSource(data.content);
            setTotal(data.page.totalElements);
        } finally {
            setLoading(false);
        }
    }, [pagination.current, pagination.pageSize, searchForm, sort]);

    useEffect(() => {
        if (noticeTableModalOpen) {
            fetchData();
        }
    }, [noticeTableModalOpen, pagination, sort, fetchData]);

    const noticeTableColumn: ColumnsType<NoticeData> = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
        },
        {
            title: '标题',
            dataIndex: 'title',
        },
        {
            title: '内容',
            dataIndex: 'content',
        },
        {
            title: '附件',
            dataIndex: 'attachments',
            render: (_, record) => (
                <Space>
                    {record.attachments?.map((item, index) => (
                        <a key={index} href={item} target="_blank" rel="noreferrer">
                            附件{index + 1} 下载
                        </a>
                    ))}
                </Space>
            ),
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
        },
        {
            title: '更新时间',
            dataIndex: 'updatedAt',
        },
    ];

    const handleTableChange = (
        nextPagination: TablePaginationConfig,
        _filters: Record<string, unknown>,
        sorter: SorterResult<NoticeData> | SorterResult<NoticeData>[],
    ) => {
        const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;
        const nextSort = singleSorter?.field && singleSorter.order
            ? { [String(singleSorter.field)]: singleSorter.order }
            : {};

        setPagination({
            current: nextPagination.current ?? 1,
            pageSize: nextPagination.pageSize ?? 10,
        });
        setSort(nextSort);
    };

    const handleSearch = () => {
        setPagination((prev) => ({ ...prev, current: 1 }));
        fetchData(1, pagination.pageSize, sort);
    };

    const handleReset = () => {
        searchForm.resetFields();
        const resetPagination = { current: 1, pageSize: 10 };
        setPagination(resetPagination);
        setSort({});
        fetchData(resetPagination.current, resetPagination.pageSize, {});
    };

    const handleCancel = () => {
        setNoticeTableModalOpen(false);
    };

    return (
        <Drawer
            title="消息中心"
            onClose={handleCancel}
            open={noticeTableModalOpen}
            size="large"
        >
            <Form form={searchForm} layout="inline" style={{ marginBottom: 16 }}>
                {!searchCollapsed && (
                    <>
                        <Form.Item name="title" label="标题">
                            <Input placeholder="请输入标题" allowClear />
                        </Form.Item>
                        <Form.Item name="createdAt" label="创建时间">
                            <DateRange />
                        </Form.Item>
                    </>
                )}
                <Form.Item>
                    <Space>
                        <Button type="primary" onClick={handleSearch}>
                            查询
                        </Button>
                        <Button onClick={handleReset}>
                            重置
                        </Button>
                        <Button type="link" onClick={() => setSearchCollapsed((prev) => !prev)}>
                            {searchCollapsed ? '展开' : '收起'}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
            <Table<NoticeData>
                rowKey="id"
                loading={loading}
                columns={noticeTableColumn}
                dataSource={dataSource}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total,
                    showSizeChanger: true,
                }}
                onChange={handleTableChange}
            />
        </Drawer>
    );
}
