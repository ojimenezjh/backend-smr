import { Request, Response } from 'express';
import { poolaso, database_usuario } from '../database/database';
import { QueryResult } from 'pg';


class CardsController {
    public async getCards(req: Request, res: Response): Promise<Response> { // La promesa sirve para decir que si o si la función tiene que recibir una respuesta

        try {
            const pool = poolaso();
            console.log(database_usuario());
            const response: QueryResult = await pool.query('SELECT * FROM comida.cartas ORDER BY posicion');
            return res.status(200).json(response.rows);
        }

        catch (e) {
            console.log(e);
            return res.status(500).json('Internal Server Error');
        }

    };

    public async getCardbyId(req: Request, res: Response): Promise<Response> {
        try {
            const pool = poolaso();
            const id = parseInt(req.params.id);
            const response: QueryResult = await pool.query('SELECT * FROM comida.cartas WHERE id_carta = $1', [id]);
            return res.json(response.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal Server Error');
        }
    };

    public async createCard(req: Request, res: Response): Promise<Response> {
        const pool = poolaso();
        const { id, nombre, descripcion, hora_inicio, hora_fin, imagen } = req.body;
        const response: QueryResult = await pool.query('INSERT INTO comida.cartas (id, nombre, descripcion, hora_inicio, hora_fin, imagen, posicion) VALUES ($1, $2, $3, $4, $5, (SELECT MAX(posicion)+1 FROM comida.cards))', [id, nombre, descripcion, hora_inicio, hora_fin, imagen]);
        return res.json({
            message: 'Card created succesfully',
            body: {
                card: {
                    id,
                    nombre,
                    descripcion,
                    hora_inicio,
                    hora_fin,
                    imagen
                }
            }
        });
    };

    public async updateCard(req: Request, res: Response): Promise<Response> {
        const pool = poolaso();
        const id = parseInt(req.params.id);
        const { nombre, descripcion, hora_inicio, hora_fin, imagen } = req.body;
        const response: QueryResult = await pool.query('UPDATE comida.cartas SET nombre = $1, descripcion = $2, hora_inicio = $3, hora_fin= $4, imagen = $5 WHERE id = $6', [nombre, descripcion, hora_inicio, hora_fin, imagen, id]);
        return res.json({
            message: `Card ${id} updated succesfully`
        });
    };

    public async deleteCard(req: Request, res: Response): Promise<Response> {
        const pool = poolaso();
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM comida.cartas WHERE id = $1', [id]);
        return res.json({
            message: `Card ${id} deleted succesfully`
        });
    };

}

const cardsController = new CardsController();
export default cardsController;

