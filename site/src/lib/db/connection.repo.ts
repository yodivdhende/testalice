import { type UserRole } from '$lib/types/roles';
import { v4 as uuidv4 } from 'uuid';
import { mysqlconnFn } from './mysql';
import { type Connection as MySqlConnection } from 'mysql2/promise';

class ConnectionRepo {
	public async create({
		userId,
		roles,
		endDate,
		descripiton
	}: {
		userId: number;
		roles: UserRole[];
		endDate?: Date;
		descripiton?: string;
	}): Promise<string> {
		await this.removeExpiredConnections();
		const connection = await mysqlconnFn();
		const token = await this.addConnection(connection, { userId, endDate, descripiton });
		await this.addConnectionRoles(connection, { roles, token });
		return token;
	}

	private async addConnection(
		connection: MySqlConnection,
		{ userId, endDate, descripiton }: { userId: number; endDate?: Date; descripiton?: string }
	): Promise<string> {
		const connectionToken = uuidv4();
		await connection.execute(
			`
            INSERT INTO Connections (Token, UserId,Start, End, Description)
            VALUES (?, ?,NOW(), ?, ?)
            `,
			[connectionToken, userId, this.convertDateToDateTimeString(endDate), descripiton ?? null]
		);
		return connectionToken;
	}

	private convertDateToDateTimeString(date?: Date) {
		return date?.toJSON().slice(0, 19).replace('T', ' ') ?? null;
	}

	private async addConnectionRoles(
		connection: MySqlConnection,
		{ roles, token }: { roles: UserRole[]; token: string }
	): Promise<void> {
		const queryValues: string[] = roles.map(() => '(?, ?)');
		const values = roles.flatMap((role) => [token, role]);
		await connection.execute(
			`
            INSERT INTO Connection_Roles (Token, Role)
            VALUES ${queryValues.join(',')}
            `,
			values
		);
	}

	public async delete(token: string) {
		await this.removeExpiredConnections();
		const connection = await mysqlconnFn();
		await this.deleteConnectionRoles(connection, token);
		await this.deleteConnections(connection, token);
	}

	private async deleteConnections(connection: MySqlConnection, token: string) {
		await connection.execute(
			`
                DELETE FROM Connections
                WHERE Token = ?
                `,
			[token]
		);
	}

	private async deleteConnectionRoles(connection: MySqlConnection, token: string) {
		await connection.execute(
			`
                DELETE FROM Connection_Roles
                WHERE Token = ?
                `,
			[token]
		);
	}

	public async getCredentials(token: string): Promise<{ userId: number; roles: UserRole[] } | null> {
			await this.removeExpiredConnections();
			const connection = await mysqlconnFn();
			const [dbResult] = await connection.execute(`
                SELECT
					c.UserId as userId,
					cr.Role as role
				FROM Connection_Roles cr
				JOIN Connections c
					ON cr.Token = c.Token
                WHERE c.Token = ?
            `,[token]);
			if (Array.isArray(dbResult) === false) return null;
			if (dbResult.length === 0) return null;
			let userRoleResult: { userId: number; roles: UserRole[] } | undefined;
			for (let { userId, role } of dbResult as any[]) {
				if(userRoleResult === undefined) userRoleResult = {userId, roles: []};
				userRoleResult.roles.push(role);
			}
			return userRoleResult ?? null;
	}

	private async removeExpiredConnections() {
		const connection = await mysqlconnFn();
		await connection.execute(`
                DELETE FROM Connection_Roles
                WHERE Token in (
                    SELECT Token
                    FROM Connections c
                    WHERE  c.End IS NOT NULL
                    AND c.End < NOW()
                )
            `);
		await connection.execute(`
                DELETE FROM Connections
                WHERE End IS NOT NULL
                AND End < NOW()
				`);
	}

	public async getAll() {
		const connection = await mysqlconnFn();
		const [connectionRoles] = await connection.execute(`
				SELECT
					c.Token as token,
					c.Start as start,
					c.End as end,
					c.Description as description,
					cr.Role as role
				FROM Connections c
				join Connection_Roles cr
					on c.Token = cr.Token 
				`);
		const connections: Connection[] = [];
		for (let connectionRole of connectionRoles as any[]) {
			let existingConnection = connections.find(
				(connection) => connection.token === connectionRole.token
			);
			if (existingConnection === undefined) {
				existingConnection = {
					token: connectionRole.token,
					start: connectionRole.start,
					end: connectionRole.end,
					description: connectionRole.description,
					roles: []
				};
				connections.push(existingConnection);
			}
			if (existingConnection.roles.includes(connectionRole.role) === false) {
				existingConnection.roles.push(connectionRole.role);
			}
		}
		return connections;
	}
}

export const connectionRepo = new ConnectionRepo();
export type Connection = {
	token: string;
	start: Date;
	end: Date | null;
	description: string;
	roles: UserRole[];
};
