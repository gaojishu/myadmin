import type { ApiResult, Pageable, OpLogData, PageQuery, OpLogSearchParams } from "@/types";
import http from "@/utils/http";

export async function opLogPage(params?: OpLogSearchParams, page?: PageQuery) {
    const res = await http.post<ApiResult<Pageable<OpLogData>>>({
        url: `/admin/oplog/page`,
        data: {
            params, page
        },
    });

    return res.data;
}


export async function opLogExport(params?: OpLogSearchParams) {
    const res = await http.post<ApiResult<null>>({
        url: `/admin/oplog/export`,
        params: {},
        data: {
            params
        },
    });

    return res.data;
}
