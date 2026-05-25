import type { ApiResult, RoleData, RoleStore } from "@/types";
import http from "@/utils/http";

export async function roleRecords() {
    const res = await http.get<ApiResult<RoleData[]>>({
        url: `/role/list`,
        params: {},
    });

    return res.data;
}

export async function roleUpdate(data: RoleStore) {
    const res = await http.post<ApiResult<RoleData>>({
        url: `/role/update`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function roleCreate(data: RoleStore) {
    const res = await http.post<ApiResult<RoleData>>({
        url: `/role/create`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function roleDelete(id: string) {
    const res = await http.get<ApiResult<null>>({
        url: `/role/delete?id=${id}`,
        params: {},
    });

    return res.data;
}