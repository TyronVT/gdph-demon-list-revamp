import type { Role } from "./Role";

export type PocketbaseUser = {
    avatar: string;
    collectionId: string;
    collectionName: string;
    created: string;
    email: string;
    emailVisibility: boolean;
    id: string;
    name: string;
    role: Role;
    updated: string;
    username: string;
    verified: boolean;
}