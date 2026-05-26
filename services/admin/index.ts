import type { ApiResult, AdminData, Pageable, AdminCreate, AdminUpdate, AdminSearchParams, PageQuery } from "@/types";
import http from "@/utils/http";
import type { SortOrder } from "antd/es/table/interface";

export async function adminPage(params?: AdminSearchParams, page?: PageQuery) {
    const res = await http.post<ApiResult<Pageable<AdminData>>>({
        url: `/admin/admin/page`,
        data: {
            params, page
        },
    });

    return res.data;
}


export async function adminCreate(data: AdminCreate) {
    const res = await http.post<ApiResult<null>>({
        url: `/admin/admin/create`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function adminUpdate(data: AdminUpdate) {
    const res = await http.post<ApiResult<null>>({
        url: `/admin/admin/update`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function adminDetail(id: string) {
    const res = await http.get<ApiResult<AdminData>>({
        url: `/admin/admin/detail?id=${id}`,
        params: {},
    });

    return res.data;
}