const sqlite = require("better-sqlite3");
const db = new sqlite("./testDB.db");

exports.setTable = () => {
    const stmt = db.prepare(`CREATE TABLE IF NOT EXISTS names (
                                                    id INTEGER PRIMARY KEY,
                                                    name TEXT NOT NULL
                                                )`);
    const info = stmt.run();
}

const setHouseTable = () => {
    const stmt = db.prepare(`CREATE TABLE IF NOT EXISTS houses (
        id INTEGER PRIMARY KEY,
        designation TEXT NOT NULL
    )`);
    const info = stmt.run()
}
const createApartmentTable = () => {
    const stmt = db.prepare(`CREATE TABLE IF NOT EXISTS apartments (
        id INTEGER PRIMARY KEY,
        designation TEXT NOT NULL,
        house_id INTEGER,
        FOREIGN KEY(house_id) REFERENCES houses(id)
    )`)
    const info = stmt.run();
}
setHouseTable();
createApartmentTable();

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

exports.deleteName = (id) => {
    if(!id) return;
    const stmt = db.prepare("DELETE FROM names WHERE id = ?");
    const info = stmt.run(id);
}

// zum Haus...
// Häuser haben eine Bezeichnung
// Häuser haben eine Wohnung oder mehrere mit einem Besitzer
exports.createHouse = (designation) => {
    if(!designation) return;
    const stmt = db.prepare("INSERT INTO houses (designation) VALUES (?)");
    const info = stmt.run(designation);
}

exports.deleteHouse = (id) => {
    if(!id) return;
    const stmt = db.prepare("DELETE FROM houses WHERE id = ?");
    const info = stmt.run(id);
}

exports.updateHouse = (houseObj) => {
    if(!houseObj) return;
    const {id, designation} = houseObj;
    const stmt = db.prepare(`UPDATE houses 
                                SET designation=?
                                WHERE id=?`);
    const info = stmt.run(designation, id)
}

exports.allHouses = () => {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("SELECT * FROM houses");
        const houses = stmt.all();
        if(houses.length < 1) reject()
        resolve(houses);
    })
}

// Apartment
exports.createApartment = (apartObj) => {
    if(!apartObj) return;
    const {houseId, designation} = apartObj;
    const stmt = db.prepare("INSERT INTO apartments (designation, house_id) VALUES (?,?)");
    const info = stmt.run(designation, houseId);
}

exports.showApartmentsFromHouse = (houseId) => {
    if(!houseId) return;
    return new Promise((resolve) => {
        const stmt = db.prepare(`SELECT h.designation AS houseDes, 
                                        a.designation AS apartDes,
                                        a.id
                                        FROM apartments a
                                    INNER JOIN houses h
                                    ON h.id = a.house_id
                                    WHERE a.house_id = ?`);
        const apartments = stmt.all(houseId);
        if(apartments.length < 1) resolve({});
        resolve(apartments);
    });    
}