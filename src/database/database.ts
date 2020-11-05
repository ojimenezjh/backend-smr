import { Pool } from 'pg';
import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';

var db2: string;
// CONFIG ALEX

/*export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '12345678',
    port: 5433
});*/

// CONFIG OSCAR

//var host = 'localhost';
 export const database = async function dataBase(req: Request, res: Response, next: NextFunction ) {   
    const email = req.body.email;    
    const response: QueryResult = await pool2.query('SELECT database FROM users.users WHERE email = $1', [email]);
    const rows = JSON.stringify(response.rows)
    db2 = rows.slice(14,-3);
    console.log(db2)
    //console.log(profile_user());
    next(); 
    return false; 
    }
   
 export function database_usuario() {
  return db2;
}

//const dataBase = new DataBase();
//export default dataBase;
// También podemos especificar database

export const pool2 = new Pool({
  user: 'postgres',
  host: '82.223.128.240',
  password: 'adriparguela123',
  port: 5432,
  database: 'postgres'
});

/*export var pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '12345678',
    port: 5432,
    database: ''//db2//database_usuario(db2)
    
});*/
export function poolaso() {
return  new Pool ({
  user: 'postgres',
  host: '82.223.128.240',
  password: 'adriparguela123',
  port: 5432,
  database: database_usuario()
});
}