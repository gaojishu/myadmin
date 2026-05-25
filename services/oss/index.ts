import type { ApiResult, OssPostPolicy } from "@/types";
import http from "@/utils/http";

export async function ossPostPolicy() {
    const res = await http.get<ApiResult<OssPostPolicy>>({
        url: `/common/upload-policy`,
        params: {},
    });

    return res.data;
}


