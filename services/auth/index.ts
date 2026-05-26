import http from "@/utils/http";
import type { AdminData, ApiResult, AuthLoginRequest, AuthLoginToken, PermissionData } from "@/types";
import { logout, setAuthInfoState, setAuthPermissionState } from "./authService";

export async function authLogin(data: AuthLoginRequest) {
    const res = await http.post<ApiResult<AuthLoginToken>>({
        url: `/admin/auth/login`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function authLogout() {
    const res = await http.get<ApiResult<null>>({
        url: `/admin/auth/logout`,
        params: {},
    });

    logout()
    return res.data;
}

export async function authInfo() {
    const res = await http.get<ApiResult<AdminData>>({
        url: `/admin/auth/info`,
        params: {},
    });

    setAuthInfoState(res.data);

    return res.data;
}

export async function authPermission() {
    const res = await http.get<ApiResult<PermissionData[]>>({
        url: `/admin/auth/permission`,
        params: {},
    });

    setAuthPermissionState(res.data);
    return res.data;
}