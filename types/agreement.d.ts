import type { SortOrder } from "antd/es/table/interface";
import type { ICommonData } from "./global";

export interface AgreementData extends ICommonData {
    title: string | null;
    content: string | null;
    version: string | null;
    type: string | null;
    isActive: boolean | null;
}

export type AgreementOrder = {
    id?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
};

export type AgreementCreate = Pick<AgreementData,
    'title' | 'content' | 'version' | 'type' | 'isActive'
>;

export type AgreementUpdate = Pick<AgreementData,
    'id' | 'title' | 'content' | 'version' | 'type' | 'isActive'
>;

export type AgreementPageParams = Pick<AgreementData,
    'title' | 'version' | 'type' | 'isActive'
> & {
    current: number;
    pageSize: number;
    createdAt: string[] | null;
};
