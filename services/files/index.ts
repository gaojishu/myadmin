import type { ApiResult, Pageable } from "@/types";
import { FilesCreate, FilesData, FilesUpdate } from "@/types/files";
import http from "@/utils/http";
import type { FilesPageParams } from "@/types/files";
import type { SortOrder } from "antd/es/table/interface";

export async function filesPage(params: FilesPageParams, sort: Record<string, SortOrder>) {
    const res = await http.post<ApiResult<Pageable<FilesData>>>({
        url: `/admin/files/page`,
        params: {},
        data: {
            params, sort
        },
    });

    return res.data;
}

export async function filesCreate(data: FilesCreate) {
    const res = await http.post<ApiResult<null>>({
        url: `/admin/files/create`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function filesUpdate(data: FilesUpdate) {
    const res = await http.post<ApiResult<null>>({
        url: `/admin/files/update`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function filesHash(hash: string) {
    const res = await http.get<ApiResult<null>>({
        url: `/admin/files/hash?hash=${hash}`,
        params: {},
    });

    return res.data;
}

export async function filesDelete(keys: string[]) {
    const res = await http.post<ApiResult<null>>({
        url: `/admin/files/delete`,
        params: {},
        data: {
            keys: keys
        },
    });

    return res.data;
}