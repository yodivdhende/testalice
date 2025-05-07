export const UserRole = {
    user : 'user',
    admin : 'admin',
    player : 'player',
    extra : 'extra',
} as const
export type UserRole = typeof UserRole[keyof typeof UserRole];

export function isUserRole(role: any): role is UserRole {
    return (
        typeof role === 'string' &&
        Object.values(UserRole).includes(role as UserRole)
    )
}
