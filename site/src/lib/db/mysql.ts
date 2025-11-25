import mysql from 'mysql2/promise';

let mysqlconn: Promise<mysql.Connection> | null = null;

export function mysqlconnFn(): Promise<mysql.Connection> {

    if (!mysqlconn) {
        mysqlconn = mysql.createConnection({ 
            host: 'localhost',
            port: 3307,
            user: 'yodi',
            password: 'Tester@123',
            database: 'testaliceDB',
            namedPlaceholders: true,
        });
    }

    return mysqlconn;
}