import type { ApiResult, AdminData, Pageable, AdminCreate, AdminUpdate } from "@/types";
import http from "@/utils/http";
import type { SortOrder } from "antd/es/table/interface";

export async function adminPage(params: null, sort: Record<string, SortOrder>) {
    const res = await http.post<ApiResult<Pageable<AdminData>>>({
        url: `/admin/page`,
        params: {},
        data: {
            params, sort
        },
    });

    return res.data;
}


export async function adminCreate(data: AdminCreate) {
    const res = await http.post<ApiResult<null>>({
        url: `/admin/create`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function adminUpdate(data: AdminUpdate) {
    const res = await http.post<ApiResult<null>>({
        url: `/admin/update`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function adminDetail(id: string) {
    const res = await http.get<ApiResult<AdminData>>({
        url: `/admin/detail?id=${id}`,
        params: {},
    });

    return res.data;
}