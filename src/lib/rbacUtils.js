import { rolePermissions } from "./rolePermissions";

// Check if user has a specific role
export function checkRole(user, requiredRole) {
    if (!user) {
        return false;
    }
    return user.role === requiredRole;
}

// Check if user has specific permissions
export function checkPermissions(user, requiredPermissions) {
    if (!user) {
        return false;
    }
    const userPermissions = rolePermissions[user.role];
    return userPermissions?.includes(requiredPermissions);
}

export function checkRoleandPermissions(user, requiredRole, requiredPermissions) {
    return checkRole(user, requiredRole) && checkPermissions (user, requiredPermissions);
}