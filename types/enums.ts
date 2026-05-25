import type { ValueLabel } from "./global";


export type EnumsData = {
    permissionTypeEnum: ValueLabel[];
    adminDisabledStatusEnum: ValueLabel[];
    agreementTypeEnum: ValueLabel[];
    filesTypeEnum: ValueLabel[];
    filesVisibilityEnum: ValueLabel[];
    asyncJobStatusEnum: ValueLabel[];
    asyncJobQueueEnum: ValueLabel[];
    configKeyEnum: ValueLabel[];
    userGenderEnum: ValueLabel[];
    userStatusEnum: ValueLabel[];
    userSnsPlatformEnum: ValueLabel[];
    userSnsClientTypeEnum: ValueLabel[];
    aiModelTypeEnum: ValueLabel[];
    aiModelStatusEnum: ValueLabel[];
    aiModelProviderEnum: ValueLabel[];
    /** BizTypeEnum（AI 等业务共用），由 /common/enums 下发 */
    bizTypeEnum: ValueLabel[];
    paymentStatusEnum: ValueLabel[];
    paymentProviderEnum: ValueLabel[];
    paymentChannelEnum: ValueLabel[];
    paymentMethodEnum: ValueLabel[];
    paymentBizTypeEnum: ValueLabel[];
    /** PaymentRefundStatusEnum，由 /common/enums 下发 */
    paymentRefundStatusEnum: ValueLabel[];

    benefitKeyEnum: ValueLabel[];
    benefitTypeEnum: ValueLabel[];
    productTypeEnum: ValueLabel[];

};
