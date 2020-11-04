import { Request, Response } from 'express';
import { poolaso, database_usuario } from '../database/database';
import { QueryResult } from 'pg';


class CardsController {
    public async getCards(req: Request, res: Response) : Promise<Response> { // La promesa sirve para decir que si o si la función tiene que recibir una respuesta

        try{
            const pool = poolaso();
            console.log(database_usuario());
            const response: QueryResult = await pool.query('SELECT * FROM comida.cartas ORDER BY posicion');
            return res.status(200).json(response.rows);
        }
    
        catch(e){
            console.log(e);
            return res.status(500).json('Internal Server Error');
        }
        
    };
    
    public async getCardbyId(req: Request, res: Response) : Promise<Response> {
        try {
        const pool = poolaso();
        const id = parseInt(req.params.id);
        const response: QueryResult = await pool.query('SELECT * FROM comida.cartas WHERE id_carta = $1', [id]);
        return res.json(response.rows);
        }
        catch(e){
            console.log(e);
            return res.status(500).json('Internal Server Error');
        }
    };
    
}

const cardsController = new CardsController();
export default cardsController;

