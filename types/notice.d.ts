import { ICommonData } from "./global";

export interface NoticeData extends ICommonData {
    title: string;
    content: string;
    adminId: string | null;
    attachments: string[] | null;
}

