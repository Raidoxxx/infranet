const pool = require('../config/MySQL');
const sqliteDb = require('../config/Sqlite');
const dotenv = require('dotenv');
dotenv.config();

class Database {

    constructor() {
        this.mode = process.env.DB_DIALECT || 'sqlite'; // 'mysql' ou 'sqlite'
        this.pool = pool;
        this.sqliteDb = sqliteDb;
    }

    async query(sql, params) {
        if (this.mode === 'mysql') {
            const [rows] = await this.pool.execute(sql, params);
            return rows;
        } else if (this.mode === 'sqlite') {
            const db = await this.sqliteDb;
            return db.all(sql, params);
        } else {
            throw new Error('Unsupported database mode');
        }
    }

    async testConnection() {
        if (this.mode === 'mysql') {
            const connection = await this.pool.getConnection();
            await connection.ping();
            connection.release();
        } else if (this.mode === 'sqlite') {
            const db = await this.sqliteDb;
            await db.get('SELECT 1');
        } else {
            throw new Error('Unsupported database mode');
        }
    }

    async close() {
        if (this.mode === 'mysql') {
            await this.pool.end();
        } else if (this.mode === 'sqlite') {
            const db = await this.sqliteDb;
            await db.close();
        }
    }
}
module.exports = Database;