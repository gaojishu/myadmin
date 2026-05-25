import type { ApiResult, PermissionCreate, PermissionUpdate, PermissionData } from "@/types";
import http from "@/utils/http";
import { buildPermissionRecordTree } from "./permissionService";

export async function permissionTree() {
    const res = await http.get<ApiResult<PermissionData[]>>({
        url: `/permission/list`,
        params: {},
    });

    const tree = buildPermissionRecordTree(res.data);
    return tree;
}

export async function permissionCreate(data: PermissionCreate) {
    const res = await http.post<ApiResult<null>>({
        url: `/permission/create`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function permissionUpdate(data: PermissionUpdate) {
    const res = await http.post<ApiResult<null>>({
        url: `/permission/update`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function permissionDelete(id: string | number) {
    const res = await http.get<ApiResult<null>>({
        url: `/permission/delete?id=${id}`,
        params: {},
    });

    return res.data;
}