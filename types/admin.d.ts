import { SortOrder } from "antd/es/table/interface";
import { ICommonData } from "./global";
import { PermissionRecord } from "./permission";

export interface AdminData extends ICommonData {
    mobile: string | null;
    nickname: string | null;
    email: string | null;
    password: string | null;
    username: string;
    disabledStatus: number;
    permission?: PermissionRecord[] | null;
    permissionKey: string[] | null;
}

export type AdminSortOrder = {
    id: SortOrder;
}

export type AdminCreate = Pick<AdminRecord,
    'mobile' | 'nickname' | 'email' | 'password' | 'username' | 'permissionKey'
> & {
    disabledStatus: number | string,
    permissionKey: string[]
}

export type AdminUpdate = Pick<AdminRecord,
    'mobile' | 'nickname' | 'email' | 'password' | 'username' | 'permissionKey' | 'id'
> & {
    disabledStatus: number | string
}