import { Button, Col, Form, FormProps, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import FilesTypeRadio from "./FilesTypeRadio";
import DateRange from "../DateRange";
import FilesCategoryManage from "./FilesCategoryManage";
import { filesCategoryRecords } from "@/services/filesCategory";
import { FilesCategoryData } from "@/types";
import FilesVisibilityRadio from "./FilesVisibilityRadio";

export default function FilesSearchForm(props: FormProps) {
    const [form] = Form.useForm();
    const [filesCategoryRecordsData, setFilesCategoryRecordsData] = useState<FilesCategoryData[]>([]);
    const [filesCategoryModalOpenState, setFilesCategoryModalOpenState] = useState<boolean>(false);

    useEffect(() => {
        filesCategoryRecords().then((res) => {
            setFilesCategoryRecordsData(res);
        });
    }, []);

    return (
        <>
            <FilesCategoryManage
                fileCategoryManageOpen={filesCategoryModalOpenState}
                setFileCategoryManageOpen={setFilesCategoryModalOpenState}
            />
            <Form
                {...props}
                form={form}
                layout="horizontal"
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="name" label="名称">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <FilesVisibilityRadio
                            name="visibility"
                            label="可见性"
                            radioType="button"
                        />
                    </Col>
                    <Col span={12}>
                        <Form.Item name="categoryId" label="分类">
                            <Select
                                placeholder="请选择"
                                style={{ width: '100%' }}
                                options={filesCategoryRecordsData}
                                fieldNames={{
                                    label: 'name',
                                    value: 'id',
                                }}
                                allowClear
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item>
                            <Button onClick={() => {
                                setFilesCategoryModalOpenState(true);
                            }}>分类管理</Button>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <FilesTypeRadio
                            name="type"
                            label="类型"
                            radioType="button"
                        />
                    </Col>
                    <Col span={12}>
                        <Form.Item name="createdAt" label="创建时间">
                            <DateRange />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
}
