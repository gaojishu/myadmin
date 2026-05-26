export interface ICommonData {
  readonly id: number | string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export type ValueLabel = {
  value: string | number;
  label: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResult<T = any> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

export type TabsTargetKey = React.MouseEvent | React.KeyboardEvent | string | undefined;

export type PageQuery = {
  page?: number;
  size?: number;
}

export interface Pageable<T> {
  list: T[];
  total: number;
  size: number;
  page: number;
}
