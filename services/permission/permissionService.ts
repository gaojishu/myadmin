import type { PermissionMenuTree, PermissionData, PermissionTree } from "@/types";


/**
 * 将 PermissionRecord[] 转换为 Ant Design 的 Menu 所需的 MenuItem[] 树形结构
 */
export function buildMenuTree(permissionRecords: PermissionData[]): PermissionMenuTree[] {

    // 第一步：构建树形结构（已有）
    const tree = buildPermissionRecordTree(permissionRecords);



    // 第二步：递归映射为 MenuItem 结构
    const mapToMenuItem = (nodes: PermissionTree[]): PermissionMenuTree[] => {

        const nn = nodes
            .filter(node => node.type == "MENU_PERMISSION")
            .map(node => {

                return {
                    key: node.key.toString(),
                    label: node.name,
                    children: node.children && node.children.length > 0
                        ? mapToMenuItem(node.children).length && mapToMenuItem(node.children)
                        : undefined,
                }
            });

        return nn;
    };

    return mapToMenuItem(tree);
}

export function buildPermissionRecordTree(permissions: PermissionData[]): PermissionTree[] {

    // 构建一个 map，方便通过 id 快速查找
    const map = new Map<number | string, PermissionTree>();
    permissions.forEach(p => {
        map.set(p.id, { ...p, children: null });
    });

    // 根节点列表
    const tree: PermissionTree[] = [];

    permissions.forEach(p => {
        const node = map.get(p.id)!;
        if (p.parentId === null || p.parentId === undefined) {
            // 没有父节点，是根节点
            tree.push(node);
        } else {
            // 有父节点，添加到父节点的 children 中
            const parent = map.get(p.parentId);
            if (parent) {
                parent.children = parent.children || [];
                parent.children.push(node);
            }
        }
    });

    return tree;
}
