import mysql from 'mysql2/promise';

let mysqlconn: Promise<mysql.Connection> | null = null;

export function mysqlconnFn(): Promise<mysql.Connection> {

    if (!mysqlconn) {
        mysqlconn = mysql.createConnection({ 
            host: '127.0.0.1',
            port: 3307,
            user: 'Yodi',
            password: 'Tester@123',
            database: 'testaliceDB'
        });
    }

    return mysqlconn;
}