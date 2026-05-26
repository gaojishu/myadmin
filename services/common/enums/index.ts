import type { ApiResult, EnumsData } from "@/types";
import http from "@/utils/http";
import { setEnumsState } from "./EnumsService";

export async function enumsList() {
    const res = await http.get<ApiResult<EnumsData>>({
        url: `/common/enums/list`,
        params: {},
    });
    setEnumsState(res.data);
    return res.data;
}



