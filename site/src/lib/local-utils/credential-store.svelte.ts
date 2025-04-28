import { browser } from "$app/environment";
import type { UserRole } from "$lib/types/roles";

class CredentialStorage {
	private _roles: UserRole[] = $state([]);
	public get roles(): UserRole[] {
		if(this._roles.length > 0) return this._roles;
		if(browser) {
			const storageValueString =window.localStorage.getItem('active-roles')
			if(storageValueString) return JSON.parse(storageValueString);
		}
		return this._roles;
	}

	public set roles(value: UserRole[]) {
		if(browser) localStorage.setItem('active-roles', JSON.stringify(value));
		this._roles = value;
	}
}
export const credentialStore = new CredentialStorage();
