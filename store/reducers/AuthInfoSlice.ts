import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AdminData } from '@/types';

const initialState: AdminData = {
    id: 0,
    username: '',
    nickname: '',
    mobile: '',
    email: '',
    password: '',
    disabledStatus: 0,
    permission: null,
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
    permissionKey: null,
};

const AuthInfoSlice = createSlice({
    name: 'authInfoState',
    initialState,
    reducers: {
        /**
         * 登录：接受部分字段更新
         */
        authInfoStateUpdate(state, action: PayloadAction<Partial<AdminData>>) {
            return {
                ...state,
                ...action.payload
            };
        },

        /**
         * 登出：重置为初始状态
         */
        authInfoStateRemove() {
            return initialState;
        }
    }
});

// 导出 actions 和 reducer
export const { authInfoStateUpdate, authInfoStateRemove } = AuthInfoSlice.actions;
export default AuthInfoSlice.reducer;