import { SortOrder } from "antd/es/table/interface";
import { ICommonData } from "./global";
import { AdminData } from "./admin";

export interface OpLogData extends ICommonData {
    adminId: string | null;
    ip: string | null;
    method: string | null;
    uri: string | null;
    path: string | null;
    duration: number | null;
    remark: string | null;
    params: string | null;
    queryParams: string | null;
    admin: AdminData | null;
}

export type OpLogSortOrder = {
    id: SortOrder;
}

export type OpLogSearchParams = {
    adminId: string | null;
    ip: string | null;
    method: string | null;
    path: string | null;
    remark: string | null;
    params: string | null;
    createdAt: string[] | null;
    updatedAt: string[] | null;
}

