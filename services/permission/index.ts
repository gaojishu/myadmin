import type { ApiResult, PermissionCreate, PermissionUpdate, PermissionTree, PermissionData } from "@/types";
import http from "@/utils/http";
import { buildPermissionRecordTree } from "./permissionService";

export async function permissionTree() {
    const res = await http.get<ApiResult<PermissionTree[]>>({
        url: `/admin/permission/list`,
        params: {},
    });

    const tree = buildPermissionRecordTree(res.data);
    return tree;
}

export async function permissionCreate(data: PermissionData) {
    const res = await http.post<ApiResult<null>>({
        url: `/admin/permission/create`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function permissionUpdate(data: PermissionData) {
    const res = await http.post<ApiResult<null>>({
        url: `/admin/permission/update`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function permissionDelete(id: string | number) {
    const res = await http.get<ApiResult<null>>({
        url: `/admin/permission/delete?id=${id}`,
        params: {},
    });

    return res.data;
}