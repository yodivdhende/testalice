import { isUserRole, type UserRole } from '$lib/types/roles';
import { v4 as uuidv4 } from 'uuid';
import { mysqlconnFn } from './mysql';
import { type Connection as MySqlConnection } from 'mysql2/promise';
class ConnectionRepo {
	public async create({
		roles,
		endDate,
		descripiton
	}: {
		roles: UserRole[];
		endDate?: Date;
		descripiton?: string;
	}): Promise<string> {
		try {
			await this.removeExpiredConnections();
			const connection = await mysqlconnFn();
			const token = await this.addConnection(connection, { endDate, descripiton });
			await this.addConnectionRoles(connection, { roles, token });
			return token;
		} catch (err) {
			throw err;
		}
	}

	private async addConnection(
		connection: MySqlConnection,
		{ endDate, descripiton }: { endDate?: Date; descripiton?: string }
	): Promise<string> {
		const connectionToken = uuidv4();
		await connection.execute(
			`
            INSERT INTO Connections (Token, Start, End, Description)
            VALUES (?, NOW(), ?, ?)
            `,
			[connectionToken, this.convertDateToDateTimeString(endDate), descripiton ?? null]
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
		try {
			await this.removeExpiredConnections();
			console.log('removed expired connections');
			const connection = await mysqlconnFn();
			await this.deleteConnectionRoles(connection, token);
			console.log('removed removed connection Roles');
			await this.deleteConnections(connection, token);
			console.log('removed ');
		} catch (err) {
			throw err;
		}
	}

	private async deleteConnections(connection: MySqlConnection, token: string) {
		try {
			await connection.execute(
				`
                DELETE FROM Connections
                WHERE Token = ?
                `,
				[token]
			);
		} catch (err) {
			throw err;
		}
	}

	private async deleteConnectionRoles(connection: MySqlConnection, token: string) {
		try {
			await connection.execute(
				`
                DELETE FROM Connection_Roles
                WHERE Token = ?
                `,
				[token]
			);
		} catch (err) {
			throw err;
		}
	}

	public async getRole(token: string): Promise<UserRole | null> {
		try {
			await this.removeExpiredConnections();
			const connection = await mysqlconnFn();
			const [result] = await connection.execute(`
                SELECT Role
                FROM Connetions
                WHERE Token = ?
            `);
			const [role] = result as any;
			if (isUserRole(role) === false) return null;
			return role;
		} catch (err) {
			throw err;
		}
	}

	private async removeExpiredConnections() {
		try {
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
		} catch (err) {
			throw err;
		}
	}

	public async getAll(){
		try {
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
				for (let connectionRole of (connectionRoles as any[])) {
					let existingConnection = connections.find(connection => connection.token === connectionRole.token);
					if(existingConnection === undefined) {
						existingConnection = {
							token: connectionRole.token,
							start: connectionRole.start,
							end: connectionRole.end,
							description: connectionRole.description,
							roles: [],
						};
						connections.push(existingConnection);
					}
					if(existingConnection.roles.includes(connectionRole.role) === false) {
						existingConnection.roles.push(connectionRole.role);
					}
				}
				return connections;
		} catch (err) {
			throw err;
		}
	}
	
}

export const connectionRepo = new ConnectionRepo();
export type Connection= {
	token: string;
	start: Date;
	end: Date | null;
	description: string;
	roles: UserRole[];
}
