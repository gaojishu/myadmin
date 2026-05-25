import type { ApiResult, FilesCategoryCreate, FilesCategoryData, FilesCategoryUpdate } from "@/types";
import http from "@/utils/http";

export async function filesCategoryRecords() {
    const res = await http.get<ApiResult<FilesCategoryData[]>>({
        url: `/files-category/list`,
        params: {},
    });

    return res.data;
}

export async function filesCategoryUpdate(data: FilesCategoryUpdate) {
    const res = await http.post<ApiResult<null>>({
        url: `/files-category/update`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function filesCategoryCreate(data: FilesCategoryCreate) {
    const res = await http.post<ApiResult<null>>({
        url: `/files-category/create`,
        params: {},
        data: data,
    });

    return res.data;
}

export async function filesCategoryDelete(id: string) {
    const res = await http.get<ApiResult<null>>({
        url: `/files-category/delete?id=${id}`,
        params: {},
    });

    return res.data;
}