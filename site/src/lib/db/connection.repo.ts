import { isUserRole, type UserRole } from '$lib/types/roles';
import {v4 as uuidv4} from 'uuid';
import { mysqlconnFn } from './mysql';
class ConnectionRepo {

    public async createConnection({
        role, endDate, descripiton,
    }: {
        role: UserRole,
        endDate?: Date,
        descripiton?: string,
    }): Promise<string> {
        try {
            await this.removeExpiredConnections();
            const connection = await mysqlconnFn();
            const connectionToken = uuidv4();
            await connection.execute(`
            INSERT INTO Connections (Token, Role, Start, End, Description)
            VALUES (?, ?, CUREDATE(), ?)
            `, [
                connectionToken,
                role,
                endDate?.toISOString() ?? null,
                descripiton ?? null 
            ])
            return connectionToken;
        } catch (err) {
            throw err;
        }
    }

    public async deleteConnection(token: string) {
        try {
            await this.removeExpiredConnections();
            const connection = await mysqlconnFn();
            await connection.execute(`
                DELETE Connections
                WHERE id = ?
                `, [token]
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
            `)
            const [role] = result as any;
            if(isUserRole(role) === false) return null; 
            return role;
        } catch(err) {
            throw err;
        }

    }

    private async removeExpiredConnections() {
        try {
            const connection = await mysqlconnFn();
            await connection.execute(`
                DELETE Connections
                WHERE End < CUREDATE()
            `);
        }  catch (err) {
            throw err;
        }
    }
}

export const connectionRepo = new ConnectionRepo();