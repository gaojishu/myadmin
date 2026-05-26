import { SortOrder } from "antd/es/table/interface";
import { ICommonData } from "./global";
import { PermissionRecord } from "./permission";

export interface AdminData extends ICommonData {
    mobile: string | null;
    nickname: string | null;
    email: string | null;
    password: string | null;
    username: string;
    status: string;
    permission?: PermissionRecord[] | null;
    permissionKey: string[] | null;
}

export type AdminSearchParams = {
    id?: string;
    username?: string;
    status?: string;
    createdAt?: string[];
    updatedAt?: string[];
}

export type AdminCreate = Pick<AdminData,
    'mobile' | 'nickname' | 'email' | 'password' | 'username' | 'permissionKey'
> & {
    status: string,
    permissionKey: string[]
}

export type AdminUpdate = Pick<AdminData,
    'mobile' | 'nickname' | 'email' | 'password' | 'username' | 'permissionKey' | 'id'
> & {
    status: string
}