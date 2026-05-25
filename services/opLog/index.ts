import type { ApiResult, Pageable, OpLogData } from "@/types";
import http from "@/utils/http";
import type { SortOrder } from "antd/es/table/interface";

export async function opLogPage(params: null, sort: Record<string, SortOrder>) {
    const res = await http.post<ApiResult<Pageable<OpLogData>>>({
        url: `/op-log/page`,
        params: {},
        data: {
            params, sort
        },
    });

    return res.data;
}


export async function opLogExport(params: null, sort: Record<string, SortOrder>) {
    const res = await http.post<ApiResult<null>>({
        url: `/op-log/export`,
        params: {},
        data: {
            params, sort
        },
    });

    return res.data;
}
