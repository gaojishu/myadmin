import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store'; // 确保你导出了 RootState 类型

interface AccessProps {
    auth: string;
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export const Access: React.FC<AccessProps> = ({ auth, children, fallback = null }) => {
    // 核心：使用 useSelector 订阅 store 变化
    // 当 permissionCode 改变时，React 会自动重新渲染此组件
    const authorities = useSelector((state: RootState) => state.authPermission.permissionCode);

    const hasPermission = authorities?.includes(auth) ?? false;

    return hasPermission ? <>{children}</> : <>{fallback}</>;
};

