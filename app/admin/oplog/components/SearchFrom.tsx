import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import type { OpLogSearchParams } from "@/types";
import DateRange from "@/components/DateRange";

type SearchFormProps = {
    onSearch: (values: OpLogSearchParams) => void;
    onReset: () => void;
    loading?: boolean;
};

export default function SearchForm({ onSearch, onReset, loading = false }: SearchFormProps) {

    const [form] = Form.useForm();

    const handleSearch = (values: OpLogSearchParams) => {
        onSearch(values);
    };

    const handleReset = () => {
        form.resetFields();
        onReset();
    };
    return (
        <Card size="small">
            <Form
                form={form}
                onFinish={handleSearch}
                layout="horizontal"
                style={{ padding: '12px 0 0 0' }}
            >
                {/* 使用 Row/Col 实现响应式栅格布局（一行多列） */}
                <Row gutter={16}>

                    <Col xs={24} sm={12} md={8}>
                        <Form.Item
                            name="adminId"
                            label="管理员ID"
                            normalize={(value) => (value === '' || value == null ? undefined : value)}
                        >
                            <Input placeholder="请输入管理员ID" allowClear />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                        <Form.Item name="ip" label="IP">
                            <Input placeholder="请输入IP" allowClear />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                        <Form.Item name="uri" label="接口">
                            <Input placeholder="请输入接口" allowClear />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                        <Form.Item name="createdAt" label="创建时间">
                            <DateRange />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                        <Form.Item name="updatedAt" label="更新时间">
                            <DateRange />
                        </Form.Item>
                    </Col>

                    {/* 操作按钮列 */}
                    <Col xs={24} sm={24} md={8}>
                        <Space>
                            <Button type="primary" htmlType="submit" icon={<SearchOutlined />} loading={loading}>
                                查询
                            </Button>
                            <Button onClick={handleReset}>
                                重置
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
}