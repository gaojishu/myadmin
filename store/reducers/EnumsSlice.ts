import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { EnumsData } from '@/types';


const initialState: EnumsData = {
    permissionTypeEnum: [],
    adminDisabledStatusEnum: [],
    agreementTypeEnum: [],
    filesTypeEnum: [],
    filesVisibilityEnum: [],
    asyncJobStatusEnum: [],
    asyncJobQueueEnum: [],
    configKeyEnum: [],
    userGenderEnum: [],
    userStatusEnum: [],
    userSnsPlatformEnum: [],
    userSnsClientTypeEnum: [],
    aiModelTypeEnum: [],
    aiModelStatusEnum: [],
    aiModelProviderEnum: [],
    bizTypeEnum: [],
    paymentStatusEnum: [],
    paymentProviderEnum: [],
    paymentChannelEnum: [],
    paymentMethodEnum: [],
    paymentBizTypeEnum: [],
    paymentRefundStatusEnum: [],
    benefitKeyEnum: [],
    benefitTypeEnum: [],
    productTypeEnum: [],
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