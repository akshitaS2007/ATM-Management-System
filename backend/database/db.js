const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'atm.db');
const dbExists = fs.existsSync(dbPath);

const db = new Database(dbPath);

if(!dbExists)
{
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    db.exec(schema);

    const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
    db.exec(seed);

    console.log('Database created and intialized with sample data');
}

module.exports=db;