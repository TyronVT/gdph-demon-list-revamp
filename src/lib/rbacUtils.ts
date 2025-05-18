import type { PocketbaseUser } from "../types/PocketbaseUser";
import type { Role } from "../types/Role";
import { rolePermissions } from "./rolePermissions";

// Check if user has a specific role
export function checkRole(user: PocketbaseUser, requiredRole: Role) {
    if (!user) {
        return false;
    }
    return user.role === requiredRole;
}

// Check if user has specific permissions
export function checkPermissions(user: PocketbaseUser, requiredPermissions: Role) {
    if (!user) {
        return false;
    }
    const userPermissions = rolePermissions[user.role];
    return userPermissions?.includes(requiredPermissions);
}

export function checkRoleandPermissions(user: PocketbaseUser, requiredRole: Role, requiredPermissions: Role) {
    return checkRole(user, requiredRole) && checkPermissions(user, requiredPermissions);
}