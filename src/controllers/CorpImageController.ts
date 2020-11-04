import { Request, Response } from 'express';
import { poolaso } from '../database/database';
import { QueryResult } from 'pg';


class CorpController {

    
    public async getImgbyId(req: Request, res: Response) : Promise<Response> {

        try{
        const pool = poolaso();
        const id = parseInt(req.params.id);
        const response: QueryResult = await pool.query('SELECT * FROM imgcorp WHERE id = $1', [id]);
        return res.status(200).json(response.rows);
        }
        catch(e) {
            console.log(e);
            return res.status(500).json('Internal Server Error');
        }
    };
}

const corpController = new CorpController();
export default corpController;

