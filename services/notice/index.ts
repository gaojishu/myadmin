import type { ApiResult, Pageable, NoticeData } from "@/types";
import http from "@/utils/http";
import type { SortOrder } from "antd/es/table/interface";

export async function noticePage(params: null, sort: Record<string, SortOrder>) {
    const res = await http.post<ApiResult<Pageable<NoticeData>>>({
        url: `/notice/page`,
        params: {},
        data: {
            params, sort
        },
    });

    return res.data;
}

