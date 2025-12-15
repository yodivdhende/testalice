import { browser } from "$app/environment";
import type { UserRole } from "$lib/types/roles";

class CredentialStorage {
	private _roles: UserRole[] = $state([]);
	private storageKey = 'active-roles';


	public get roles(): UserRole[] {
		if (this._roles.length > 0) return this._roles;
		if (browser) {
			if (document.cookie.includes('session-token') === false) this.cleareUserRoles();
			const storageValueString = window.localStorage.getItem(this.storageKey)
			if (storageValueString) return JSON.parse(storageValueString);
		}
		return this._roles;
	}

	public set roles(value: UserRole[]) {
		if (browser) localStorage.setItem('active-roles', JSON.stringify(value));
		this._roles = value;
	}

	private cleareUserRoles() {
		window.localStorage.removeItem(this.storageKey);
	}
}
export const credentialStore = new CredentialStorage();
