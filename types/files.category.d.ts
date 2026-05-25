import { SortOrder } from "antd/es/table/interface";
import { ICommonData } from "./global";

export interface FilesCategoryData extends ICommonData {
    name: string | null;
    remark: string | null;
}

export type FilesCategoryOrder = {
    id: SortOrder;
}

export type FilesCategoryCreate = Pick<FilesCategoryData,
    'name' | 'remark'
>

export type FilesCategoryUpdate = Pick<FilesCategoryData,
    'name' | 'remark' | 'id'
>