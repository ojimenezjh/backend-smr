import { Request, Response,  } from 'express';
import { poolaso } from '../database/database';
import { QueryResult } from 'pg';

class MesasController {

    public async getMesa(req: Request, res: Response) : Promise<Response> { // La promesa sirve para decir que si o si la función tiene que recibir una respuesta
        try{
            const pool = poolaso();
            const clave = req.body.clave;    
            const response: QueryResult = await pool.query('SELECT id_mesa FROM comida.mesas WHERE clave = $1',[ clave ]);    
            if (response.rows.length <= 0) return res.status(400).json('Mesa inexistente');
            else {  
                return res.status(200).json(response.rows);
            };                
        }
    
        catch(e){
            console.log(e);
            return res.status(500).json('Internal Server Error');
        }
        
    };
    
}

const mesasController = new MesasController();
export default mesasController;

