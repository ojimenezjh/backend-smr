"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.poolaso = exports.pool2 = exports.database_usuario = exports.database = void 0;
const tslib_1 = require("tslib");
const pg_1 = require("pg");
var db2;
// CONFIG ALEX
/*export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '12345678',
    port: 5433
});*/
// CONFIG OSCAR
//var host = 'localhost';
exports.database = function dataBase(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const email = req.body.email;
        const response = yield exports.pool2.query('SELECT database FROM users.users WHERE email = $1', [email]);
        const rows = JSON.stringify(response.rows);
        db2 = rows.slice(14, -3);
        console.log(db2);
        //console.log(profile_user());
        next();
        return false;
    });
};
function database_usuario() {
    return db2;
}
exports.database_usuario = database_usuario;
//const dataBase = new DataBase();
//export default dataBase;
// También podemos especificar database
exports.pool2 = new pg_1.Pool({
    user: 'postgres',
    host: '82.223.128.240',
    password: '1234',
    port: 5432,
    database: 'pideya'
});
/*export var pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '12345678',
    port: 5432,
    database: ''//db2//database_usuario(db2)
    
});*/
function poolaso() {
    return new pg_1.Pool({
        user: 'postgres',
        host: '82.223.128.240',
        password: '1234',
        port: 5432,
        database: database_usuario()
    });
}
exports.poolaso = poolaso;
//# sourceMappingURL=database.js.map