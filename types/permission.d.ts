import { ICommonData } from "./global";
import type { MenuProps } from "antd";

export type PermissionMenuTree = Required<MenuProps>['items'][number];

export interface PermissionData extends ICommonData {
    name: string;
    key: string;
    level: number;
    parentId: number | string | null;
    remark: string | null;
    icon: string | null;
    path: string | null;
    code: string | null;
    type: string;
    sort: number;
}

export interface PermissionTree extends PermissionData {
    children: PermissionTree[] | null;
}

export type PermissionCreate = Pick<PermissionData,
    'name' | 'parentId' | 'remark' | 'icon' |
    'path' | 'code' | 'sort'
> & {
    roleId: number[] | string[];
    type: number | string;
};

export type PermissionUpdate = Pick<PermissionData,
    'name' | 'parentId' | 'remark' | 'icon' |
    'path' | 'code' | 'sort' | 'id'
> & {
    roleId: number[] | string[];
    type: number | string;
};