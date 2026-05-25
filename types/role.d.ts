import { ICommonData } from "./global";

export interface RoleData extends ICommonData {
    name: string;
    remark: string | null;
    permissionKey: string[]
}

export type RoleStore = Pick<RoleData,
    'name' | 'permissionKey' | 'remark' | 'id'
>;