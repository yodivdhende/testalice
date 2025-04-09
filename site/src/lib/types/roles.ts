export enum UserRole {
    user = 'user',
    admin = 'admin',
} 

export function isUserRole(role: any): role is UserRole {
    return (
        typeof role === 'string' &&
        Object.values(UserRole).includes(role as UserRole)
    )
}
