const sqlite = require('sqlite3').verbose();
const { open } = require('sqlite');
const dotenv = require('dotenv');
const os = require('os');

dotenv.config();

console.log('DB_FILENAME atual:', process.env.DB_FILENAME);
 
if (!process.env.DB_FILENAME) { 
    const currentDir = process.cwd();
    process.env.DB_FILENAME = os.platform() === 'win32' ? `${currentDir}\\database.sqlite` : `${currentDir}/database.sqlite`;
    console.log(`DB_FILENAME não definido. Usando o caminho padrão: ${process.env.DB_FILENAME}`);
}

const db = open({
  filename: process.env.DB_FILENAME,
  driver: sqlite.Database
});

module.exports = db;