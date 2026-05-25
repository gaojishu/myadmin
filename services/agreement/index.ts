import type {
    AgreementCreate,
    AgreementData,
    AgreementUpdate,
    ApiResult,
    Pageable,
} from "@/types";
import http from "@/utils/http";
import type { SortOrder } from "antd/es/table/interface";

export async function agreementPage(params: null, sort: Record<string, SortOrder>) {
    const res = await http.post<ApiResult<Pageable<AgreementData>>>({
        url: `/agreement/page`,
        params: {},
        data: {
            params, sort
        },
    });

    return res.data;
}

export async function agreementDetail(id: number | string) {
    const res = await http.get<ApiResult<AgreementData>>({
        url: `/agreement/detail?id=${id}`,
        params: {},
    });

    return res.data;
}

export async function agreementCreate(data: AgreementCreate) {
    const res = await http.post<ApiResult<null>>({
        url: `/agreement/create`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function agreementUpdate(data: AgreementUpdate) {
    const res = await http.post<ApiResult<null>>({
        url: `/agreement/update`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function agreementDelete(id: number | string) {
    const res = await http.get<ApiResult<null>>({
        url: `/agreement/delete?id=${id}`,
        params: {},
    });

    return res.data;
}
