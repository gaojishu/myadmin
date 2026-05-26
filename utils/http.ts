'use client'
import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ApiResult } from '@/types';
import { message as antdMessage, usePathnameGlobal, useRouterGlobal } from '@/components/GlobalProvider';
import { store } from '@/store';

NProgress.configure({ showSpinner: false });

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
});

// 请求拦截器
instance.interceptors.request.use(config => {

    NProgress.start();

    config.withCredentials = true;
    const auth = store.getState().authLoginState;
    if (auth.token) {
        config.headers["Authorization"] = `Bearer ${auth.token}`;
    }
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    config.withCredentials = true;

    // 3. 分页参数转换 (增强健壮性)
    const data = config.data;
    if (data?.params) {
        // 确保 page 对象存在，避免报错
        // data.page = data.page || {};

        if (data.params.current !== undefined) {
            data.page.page = data.params.current;
            delete data.params.current;
        }

        if (data.params.pageSize !== undefined) {
            data.page.size = data.params.pageSize;
            delete data.params.pageSize;
        }
    }

    return config;
}, error => {
    antdMessage.error('err');

    NProgress.done();
    return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        NProgress.done();
        // //---------- start 响应数据处理  蛇形转驼峰
        // response.data = camelcaseKeys(response.data, { deep: true });
        // //---------end 响应数据处理  蛇形转驼峰
        const { message, success } = response.data ?? {};

        if (response?.status !== 200 && !success) {
            antdMessage.error(message);
            throw Error(message)
        }

        if (message) {
            // 可选：统一提示
            antdMessage.success(message);
        }
        return response;
    },
    (error) => {
        NProgress.done();

        const status = error?.response?.status;
        const message = error?.response?.data?.message || error?.response?.data || error.message;

        antdMessage.error(message);

        if (status === 401) {
            useRouterGlobal.push(`/login?redirect=${usePathnameGlobal}`);
        }

        const reason: ApiResult = {
            code: status,
            message: message,
            data: null,
            success: false
        };

        return Promise.reject(reason);
    }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type request = { url: string, params?: any, data?: any, config?: AxiosRequestConfig }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const get = async <T = any>(request: request) => {
    const res = await instance.request<T>({
        method: 'GET',
        url: request.url,
        params: request.params,
        ...request.config,
    }).then(res => res);

    return res.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const post = async <T = any>(request: request) => {
    const res = await instance.request<T>({
        method: 'POST',
        url: request.url,
        params: request.params,
        data: request.data,
        ...request.config
    }).then(res => res);

    return res.data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const put = async <T = any>(request: request) => {
    const res = await instance.request<T>({
        method: 'PUT',
        url: request.url,
        params: request.params,
        data: request.data,
        ...request.config
    }).then(res => res);
    return res.data;

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const del = async <T = any>(request: request) => {
    const res = await instance.request<T>({
        method: 'DELETE',
        url: request.url,
        params: request.params,
        ...request.config
    }).then(res => res);
    return res.data;
}


const http = {
    get,
    post,
    put,
    del,
};

export default http;