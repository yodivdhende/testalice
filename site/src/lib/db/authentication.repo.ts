import { UserRole } from '$lib/types/roles';
import { mysqlconnFn } from './mysql';
import bcrypt from 'bcrypt';

class AuthenticationRepo {
	public async register(newUser: NewUser) {
		try {
			const connection = await mysqlconnFn();
			const passwordHash = await bcrypt.hash(newUser.password, 13);
			const [result] = await connection.execute(
				`
            INSERT Users (Name, Email, Password)
            VALUES (?, ?, ?)
                `,
				[newUser.name, newUser.email, passwordHash]
			);
		} catch (err) {
			throw err;
		}
	}

	public async getCredentials(authUser: AuthUser) {
		try {
			const connection = await mysqlconnFn();
			const [result] = await connection.execute(
				`
			SELECT
				u.Id as userId,
                u.Password as password,
                CASE
                    WHEN a.UserId IS NULL THEN FALSE
					ELSE TRUE
				END AS isAdmin
            FROM Users u
            LEFT JOIN Admins a
                ON a.userId = u.id
            WHERE email = ?
        `,
				[authUser.email]
			);
			const {userId, password, isAdmin} = (result as any)[0] as any;
			if ((await bcrypt.compare(authUser.password, password)) === false) return null;
			const credential: {userId: number, roles: UserRole[] } = {userId, roles: [UserRole.user]};
			if (isAdmin) credential.roles.push(UserRole.admin);
			return credential;
		} catch (err) {
			throw err;
		}
	}
}

export const authenticationRepo = new AuthenticationRepo();

type NewUser = {
	name: string;
	email: string;
	password: string;
};

type AuthUser = {
	email: string;
	password: string;
};
