import { mysqlconnFn } from './mysql';

const userSelector = ' SELECT Id as id, Email as email, Name as name FROM Users';
export async function fetchUserByEmail({ email }: { email: string }): Promise<User> {
	try {
		const [results] = await (
			await mysqlconnFn()
		).execute(`${userSelector} WHERE email = ?  `, [email]);
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

export async function fetchUserById({ id }: { id: number }): Promise<User> {
	try {
		const [results] = await (await mysqlconnFn()).execute(`${userSelector} WHERE id = ?  `, [id]);
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

export type User = {
	id: string;
	email: string;
	name: string;
};

export function isUser(user: any): user is User {
	return (
		typeof user?.id === 'number' &&
		typeof user?.email === 'string' &&
		typeof user?.name === 'string'
	);
}
