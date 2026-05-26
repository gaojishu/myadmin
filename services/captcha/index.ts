import type { ApiResult, CaptchaCreate } from "@/types";
import http from "@/utils/http";


export async function captchaCreate() {
    const res = await http.get<ApiResult<CaptchaCreate>>({
        url: `/admin/captcha/create`,
        params: {},
    });

    return res.data;
}