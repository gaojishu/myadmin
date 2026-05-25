import type { AdminData, PermissionData } from "@/types";
import { store } from "@/store";
import { authInfoStateRemove, authInfoStateUpdate } from "@/store/reducers/AuthInfoSlice";
import { authPermissionStateUpdate } from "@/store/reducers/AuthPermissionSlice";
import defaultMenuConfig from "@/config/defaultMenu.config";
import { buildMenuTree } from "../permission/permissionService";
import { authLoginStateRemove } from "@/store/reducers/AuthLoginSlice";
import { useRouterGlobal } from "@/components/GlobalProvider";


export function setAuthPermissionState(permissions: PermissionData[]) {

    permissions.unshift(defaultMenuConfig)

    const permissionCode: string[] = [];
    permissions.forEach(p => {
        if (p.code) {
            permissionCode.push(p.code);
        }
    });

    store.dispatch(authPermissionStateUpdate({
        permission: permissions,
        permissionCode: permissionCode,
        permissionTree: buildMenuTree(permissions)
    }));
}

export function logout() {
    store.dispatch(authLoginStateRemove())
    store.dispatch(authInfoStateRemove())
    useRouterGlobal.push('/login')
}

export function setAuthInfoState(adminRecord: AdminData) {
    store.dispatch(authInfoStateUpdate({ ...adminRecord }));
}