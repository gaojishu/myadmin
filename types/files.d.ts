import { SortOrder } from "antd/es/table/interface";
import { ICommonData, ValueLabel } from "./global";

export interface FilesData extends ICommonData {
    name: string;
    remark: string | null;
    categoryId: number | null;
    key: string;
    type: ValueLabel<string>;
    mimeType: string;
    hash: string;
    size: number;
}

export type FilesOrder = {
    id: SortOrder;
}

export type FileList = Pick<FilesData,
    'name' | 'remark' | 'key' | 'mimeType' | 'categoryId' | 'hash' | 'size' | 'visibility'
>

export type FilesCreate = {
    fileList: FileList[];
}

export type FilesUpdate = Pick<FilesData,
    'name' | 'categoryId'
>

export type FilesPageParams = Pick<FilesData,
    'name' | 'categoryId'
> & {
    type: string | null;
    current: number;
    pageSize: number;
    createdAt: string[] | null;
}