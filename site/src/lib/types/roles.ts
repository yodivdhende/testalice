export enum UserRole {
    user = 'user',
    admin = 'admin',
    player = 'player',
    extra = 'extra',
} 

export function isUserRole(role: any): role is UserRole {
    return (
        typeof role === 'string' &&
        Object.values(UserRole).includes(role as UserRole)
    )
}
