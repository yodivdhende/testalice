import type { User } from "$lib/db/user.repo.svelte";

export function getActiveUser() {
    const resultString = localStorage.getItem('active-user');
    return resultString ? JSON.parse(resultString) : null;
}

export function setActiveUser(user: User){
    return localStorage.setItem('active-user',JSON.stringify(user));
}