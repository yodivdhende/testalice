import type { UserRole } from "$lib/types/roles";

class CredentialStorage {
	private _roles: UserRole[] = $state([]);
	public get roles(): UserRole[] {
		if(this._roles.length > 0) return this._roles;
		const storageValueString =localStorage.getItem('active-roles')
		if(storageValueString) return JSON.parse(storageValueString);
		return this._roles;
	}

	public set roles(value: UserRole[]) {
		console.log(`%c setting roles`, `background:lime;color:black`, {value});
		localStorage.setItem('active-roles', JSON.stringify(value));
		this._roles = value;
	}
}
export const credentialStore = new CredentialStorage();
