const sqlite = require("better-sqlite3");
const db = new sqlite("./testDB.db");

exports.setTable = () => {
    const stmt = db.prepare(`CREATE TABLE IF NOT EXISTS names (
                                                    id INTEGER PRIMARY KEY,
                                                    name TEXT NOT NULL
                                                )`);
    const info = stmt.run();
}

exports.dummyData = () => {
    const stmt = db.prepare("INSERT INTO names (name) VALUES (?)");
    const info = stmt.run("otto");
}

exports.getAllNames = async () => {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('SELECT * FROM names');
        const names = stmt.all();
        if(names.length < 1)
        {
            console.log("Fehler im getAllNames")
            reject()
        } 
        resolve(names);
    })
}

// CRUD 
// CREATE, READ, UPDATE, DELETE

exports.insertName = (name) => {
    if(!name) return;
    const stmt = db.prepare("INSERT INTO names (name) VALUES (?)");
    const info = stmt.run(name);
}