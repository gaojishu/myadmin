import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { EnumsData } from '@/types';


const initialState: EnumsData = {
    PermissionTypeEnum: [],
    AdminStatusEnum: [],
};

const EnumsSlice = createSlice({
    name: 'enumsState',
    initialState,
    reducers: {
        enumsStateUpdate(state, action: PayloadAction<Partial<EnumsData>>) {
            return {
                ...state,
                ...action.payload
            };
        },
        enumsStateRemove() {
            return initialState;
        }
    }
});

// 导出 actions 和 reducer
export const { enumsStateUpdate, enumsStateRemove } = EnumsSlice.actions;
export default EnumsSlice.reducer;