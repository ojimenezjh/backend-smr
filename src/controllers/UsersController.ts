import { Request, Response, NextFunction } from 'express';
import { pool2 } from '../database/database';
import { QueryResult } from 'pg';
import jwt from 'jsonwebtoken';

const bcrypt = require('bcryptjs');

class UsersController {

    // registro

    public async createUser(req: Request, res: Response): Promise<Response> {
        const name = req.body.name;
        const email = req.body.email;
        const database = req.body.database;
        const profile = req.body.profile;
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        const userExists: QueryResult = await pool2.query('SELECT * FROM users.users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(401).json('Usuario existente');
        }
        else {
            try {
                const response: QueryResult = await pool2.query('SELECT * FROM users.register_user ($1 ,$2, $3, $4, $5)', [name, email, password, database, profile]);
                //token
                const expiresIn = 60 * 60 * 24;
                const accessToken = jwt.sign({ id: response.rows }, 'tokentest', { expiresIn: expiresIn });
                //return res.status(200).send({"response": response, "accessToken": accessToken, "expires_in": expiresIn});
                console.log(response.rows);
                return res.header('Auth-token', accessToken).json(response.rows);
            }
            catch (e) {
                console.log(e);
                return res.status(500).json('Internal Server Error');
            }
        }

    };

    // login

    public async getUsers(req: Request, res: Response): Promise<Response> { // La promesa sirve para decir que si o si la función tiene que recibir una respuesta

        const email = req.body.email;
        const request: QueryResult = await pool2.query('SELECT password FROM users.users WHERE email = $1', [email]);
        if (request.rows.length <= 0) return res.status(400).json('Usuario inexistente');
        try {

            const pass = JSON.stringify(request.rows);
            const pass2 = pass.slice(14, -3);

            const password = req.body.password;
            const result = await bcrypt.compare(password, pass2)

            if (!result) return res.status(401).json('Password incorrecto');

            const response: QueryResult = await pool2.query('SELECT profile FROM users.users WHERE email = $1', [email]);
            if (response.rows.length <= 0) {
                return res.status(400).json('Error credenciales');
            }
            else {
                const rows = JSON.stringify(response.rows);
                const profile = rows.slice(13, -3);
                const expiresIn = 60 * 60 * 24;
                const accessToken = jwt.sign({ _id: response.rows }, 'tokentest', { expiresIn: expiresIn });
                //return res.status(200).send({"response": response, "accessToken": accessToken, "expires_in": expiresIn});
                return res.status(200).json(profile);
            };
        }

        catch (e) {
            console.log(e);
            return res.status(500).json('Internal Server Error');
        }

    };


    public async profile(req: Request, res: Response): Promise<Response> {

        try {
            const email = req.body.email;
            const response: QueryResult = await pool2.query('SELECT profile FROM users.users WHERE email = $1', [email]);
            return res.status(200).json(response.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal Server Error');
        }

    }


}

const usersController = new UsersController();
export default usersController;
