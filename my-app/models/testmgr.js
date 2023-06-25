const sqlite = require("better-sqlite3");
const db = new sqlite("./testDB.db");

exports.setTable = () => {
    const stmt = db.prepare(`CREATE TABLE IF NOT EXISTS names (
                                                    id INTEGER PRIMARY KEY,
                                                    name TEXT NOT NULL
                                                )`);
    const info = stmt.run();
    console.log(info)
}

exports.dummyData = () => {
    const stmt = db.prepare("INSERT INTO names (name) VALUES (?)");
    const info = stmt.run("otto");

    console.log(info.changes);
}

exports.getAllNames = () => {
    const stmt = db.prepare('SELECT * FROM names');
    const names = stmt.all();
    console.log(names)
}