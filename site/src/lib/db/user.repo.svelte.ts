import { mysqlconnFn } from './mysql';

class UserRepo {
	private userSelector = ' SELECT Id as id, Email as email, Name as name FROM Users';

	public async getByEmail({ email }: { email: string }): Promise<User> {
		try {
			const [results] = await (
				await mysqlconnFn()
			).execute(`${this.userSelector} WHERE email = ?  `, [email]);
			const [firstUser] = results as any;
			if (isUser(firstUser)) {
				return { id: firstUser.id, email: firstUser.email, name: firstUser.name };
			} else {
				throw new Error(`user not found with email: ${email}`);
			}
		} catch (error) {
			throw error;
		}
	}

	public async getById({ id }: { id: number }): Promise<User> {
		try {
			const [results] = await (
				await mysqlconnFn()
			).execute(`${this.userSelector} WHERE id = ?  `, [id]);
			const [firstUser] = results as any;
			console.log(firstUser);
			if (isUser(firstUser)) {
				return { id: firstUser.id, email: firstUser.email, name: firstUser.name };
			} else {
				throw new Error(`user not found with id: ${id}`);
			}
		} catch (error) {
			throw error;
		}
	}

	public async getAll(): Promise<User[]> {
		try {
			const [results] = await(await mysqlconnFn()).execute(this.userSelector) 
			return (results as any[]).filter(isUser);
		} catch (error) {
			throw error;
		}
	}

	public async save(user: User | NewUser)	 {
		if(isUser(user)) {
			this.update(user);
		} else {
			this.insert(user);
		}
	}

	public async update(user: User) {
		try {
			(await mysqlconnFn()).execute(`
				UPDATE Users
				SET Name = ?,
					Email = ?,
					Password = ''
				WHERE id = ?
				`, [user.name, user.email, user.id])
		} catch(error) {
			throw error;
		}
	}

	public async insert(user: NewUser) {
		try {
			(await mysqlconnFn()).execute(`
				INSERT Users (Name, Email, Password)
				VALUE (?, ?, ?)
				`, [user.name, user.email, user.password])
		} catch(error) {
			throw error;
		}
	}
}

export type User = {
	id: string;
	email: string;
	name: string;
	password: string;
};


export function isUser(user: any): user is User {
	return (
		typeof user?.id === 'number' &&
		typeof user?.email === 'string' &&
		typeof user?.name === 'string' && 
		typeof user?.password === 'string'
	);
};

export type NewUser = {
	email: string;
	name: string;
	password: string;
}

export function isNewUser(user: any): user is NewUser {
	return  (
		typeof user?.email === 'string' &&
		typeof user?.name === 'string' &&
		typeof user?.password === 'string'
	)
}

export const userRepo = new UserRepo();
