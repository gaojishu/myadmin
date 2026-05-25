export type AuthLoginRequest = {
    username: string;
    password: string;
    captchaCode: string;
    captchaUuid: string
}

export interface AuthLoginToken {
    token: string;
}

