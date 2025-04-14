import { isUserRole, type UserRole } from '$lib/types/roles';
import { v4 as uuidv4 } from 'uuid';
import { mysqlconnFn } from './mysql';
import { type Connection } from 'mysql2/promise';
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
            await this.addConnectionRoles(connection, {roles, token});
            return token;
		} catch (err) {
			throw err;
		}
	}

	private async addConnection(
		connection: Connection,
		{ endDate, descripiton }: { endDate?: Date; descripiton?: string }
	): Promise<string> {
		const connectionToken = uuidv4();
		await connection.execute(
			`
            INSERT INTO Connections (Token, Start, End, Description)
            VALUES (?, CUREDATE(), ?, ?)
            `,
			[connectionToken, endDate?.toISOString() ?? null, descripiton ?? null]
		);
		return connectionToken;
	}

	private async addConnectionRoles(
		connection: Connection,
		{ roles, token }: { roles: UserRole[]; token: string }
	): Promise<void> {
        const queryValues: string[] = roles.map(() => '(?, ?)');
        const values = roles.flatMap(role => ([token, role]))
		await connection.execute(`
            INSERT INTO Conneciton_Roles (Token, Role)
            VALUES ${queryValues.join(',')}
            `, values);
	}

	public async delete(token: string) {
		try {
			await this.removeExpiredConnections();
			const connection = await mysqlconnFn();
            await this.deleteConnectionRoles(connection, token);
            await this.deleteConnections(connection, token);
		} catch (err) {
			throw err;
		}
	}

    private async deleteConnections(connection: Connection, token:string) {
        try {
            await connection.execute(`
                DELETE Connections
                WHERE Token = ?
                `, token) 
        } catch (err) {
            throw err;
        }
    }


    private async deleteConnectionRoles(connection: Connection, token:string) {
        try {
            await connection.execute(`
                DELETE Connection_Roles
                WHERE Token = ?
                `, token) 
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
                DELETE Connection_Roles
                WHERE Token in (
                    SELECT Token
                    FROM Connections c
                    WHERE  c.End IS NOT NULL
                    AND c.End < CUREDATE()
                )
                ; 

                DELETE Connections
                WHERE End IS NOT NULL
                AND c.End < CUREDATE()
                ;
            `);
		} catch (err) {
			throw err;
		}
	}
}

export const connectionRepo = new ConnectionRepo();
