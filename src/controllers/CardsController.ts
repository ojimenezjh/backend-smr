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
            const id_carta = parseInt(req.params.id_carta);
            const response: QueryResult = await pool.query('SELECT * FROM comida.cartas WHERE id_carta = $1', [id_carta]);
            return res.json(response.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal Server Error');
        }
    };

    public async createCard(req: Request, res: Response): Promise<Response> {
        const pool = poolaso();
        var { nombre, descripcion, hora_inicio, hora_fin, imagen } = req.body;
        if (hora_inicio == ''){hora_inicio = null}
        if (hora_fin == ''){hora_fin = null}
        const response: QueryResult = await pool.query('INSERT INTO comida.cartas (id_carta, nombre, descripcion, hora_inicio, hora_fin, imagen, posicion) VALUES ((SELECT CASE WHEN (NOT EXISTS (SELECT id_carta from comida.cartas)) THEN 1 ELSE (SELECT MAX(id_carta)+1 FROM comida.cartas) END), $1, $2, $3, $4, bytea($5), (SELECT MAX(posicion)+1 FROM comida.cartas))', [nombre, descripcion, hora_inicio, hora_fin, imagen]);
        return res.json({
            message: 'Card created succesfully',
            body: {
                card: {
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
        const id_carta = parseInt(req.params.id_carta);
        const { nombre, descripcion, hora_inicio, hora_fin, imagen } = req.body;
        const response: QueryResult = await pool.query('UPDATE comida.cartas SET nombre = $1, descripcion = $2, hora_inicio = $3, hora_fin= $4, imagen = $5 WHERE id_carta = $6', [nombre, descripcion, hora_inicio, hora_fin, imagen, id_carta]);
        return res.json({
            message: `Card ${id_carta} updated succesfully`
        });
    };

    public async deleteCard(req: Request, res: Response): Promise<Response> {
        const pool = poolaso();
        const id_carta = parseInt(req.params.id_carta);
        await pool.query('DELETE FROM comida.cartas WHERE id_carta = $1', [id_carta]);
        return res.json({
            message: `Card ${id_carta} deleted succesfully`
        });
    };

    public async postPhoto(req: Request, res: Response) {
        let file = req.body;
        file.mv(`./files/${file.name}`,err => {
            if(err) return res.status(500).send({ message : err })
        return res.status(200).send({ message : 'File upload' })
    })
    }

}

const cardsController = new CardsController();
export default cardsController;

