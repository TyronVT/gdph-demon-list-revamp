import { PERMISSIONS, ROLES } from "../constants";

let LEADER_PERMS = [];
for (const perms of Object.keys(PERMISSIONS)) {
    LEADER_PERMS.push(PERMISSIONS[perms]);
}

export const rolePermissions = {
    [ROLES.HELPER]: [
        PERMISSIONS.ADD_DEMON_TO_PLAYER, 
        PERMISSIONS.ADD_ANNOUNCEMENT
    ],
    [ROLES.MODERATOR]: [
        PERMISSIONS.CHANGE_DEMON_RANK,
        PERMISSIONS.ADD_DEMON_TO_PLAYER,
        PERMISSIONS.REMOVE_DEMON_FROM_PLAYER,
        PERMISSIONS.ADD_DEMON
    ],
    [ROLES.LEADER]: LEADER_PERMS
};