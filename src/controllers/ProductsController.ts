import { Request, Response, NextFunction } from 'express';
import { poolaso, pool2, database_usuario } from '../database/database';
import { QueryResult, Pool } from 'pg';


class ProductsController {


    public async getProducts(req: Request, res: Response): Promise<Response> { // La promesa sirve para decir que si o si la función tiene que recibir una respuesta

        try {
            const pool = poolaso();
            console.log(database_usuario());
            const response: QueryResult = await pool.query('SELECT * FROM comida.productos ORDER BY id_producto');
            return res.status(200).json(response.rows);
        }

        catch (e) {
            console.log(e);
            return res.status(500).json('Internal Server Error');
        }

    };

    public async getProductbyId(req: Request, res: Response): Promise<Response> {
        try {
            const pool = poolaso();
            const id_producto = parseInt(req.params.id_producto);
            const response: QueryResult = await pool.query('SELECT * FROM comida.productos WHERE id_producto = $1', [id_producto]);
            return res.json(response.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal Server Error');
        }
    };

    public async getProductbyCard(req: Request, res: Response): Promise<Response> {
        try {
            const pool = poolaso();
            const id_carta = (req.params.id_carta);
            const response: QueryResult = await pool.query('SELECT p.* FROM comida.productos p NATURAL JOIN comida.carta_producto WHERE id_carta = $1', [id_carta]);
            console.log(id_carta)
            console.log(response.rows)
            console.log('consulta realizada')
            return res.json(response.rows);
        }
        catch (e) {

            console.log(e);
            return res.status(500).json('Internal Server Error');
        }
    };

    public async insertProductsByCard(req: Request, res: Response): Promise<Response> {
        try {
            const pool = poolaso();
            const id_carta = req.body.id_carta;
            const id_producto = req.body.id_producto;
            var id_products;
            id_products = JSON.parse(id_producto);
            const response: QueryResult = await pool.query('SELECT * FROM comida.addproductstocard($1,$2)', [id_carta, id_products]);
            console.log(id_carta)
            //console.log(id_productos)
            return res.json({
                message: 'Products added succesfully'
            });
        }
        catch (e) {

            console.log(e);
            return res.status(500).json('Internal Server Error');
        }
    };

    public async getProductbyName(req: Request, res: Response): Promise<Response> {
        try {
            const pool = poolaso();
            const producto = (req.params.producto)
            const response: QueryResult = await pool.query('SELECT * FROM comida.search_bar_producto($1)', [producto]);
            console.log(producto)
            return res.json(response.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal Server Error');
        }
    };

    public async createProduct(req: Request, res: Response): Promise<Response> {
        const pool = poolaso();
        var { id_producto, imagen, producto, familia, tipoveg, gluten, descripcion, posicion, precio } = req.body;
        const response: QueryResult = await pool.query('INSERT INTO comida.productos (id_producto, producto, familia, tipoveg, gluten, descripcion, posicion, precio) VALUES ((SELECT CASE WHEN (NOT EXISTS (SELECT id_producto from comida.productos)) THEN 1 ELSE (SELECT MAX(id_producto)+1 FROM comida.productos) END), $1, $2, $3, $4, $5, (SELECT MAX(posicion)+1 FROM comida.productos), $6)', [producto, familia, tipoveg, gluten, descripcion, precio]);
        return res.json({
            message: 'Product created succesfully',
            body: {
                producto: {
                    id_producto, 
                    imagen, 
                    producto, 
                    familia, 
                    tipoveg, 
                    gluten, 
                    descripcion,
                    posicion, 
                    precio
                }
            }
        });
    };
    public async updateProduct(req: Request, res: Response): Promise<Response> {
        const pool = poolaso();
        const id_producto = parseInt(req.params.id_producto);
        const {imagen, producto, familia, tipoveg, gluten, descripcion, posicion, precio } = req.body;
        const response: QueryResult = await pool.query('UPDATE comida.productos SET imagen = $1, producto = $2, familia = $3, tipoveg= $4, gluten = $5, descripcion = $6, precio = $7 WHERE id_producto = $8', [imagen, producto, familia, tipoveg, gluten, descripcion, precio, id_producto]);
        return res.json({
            message: `Product ${id_producto} updated succesfully`
        });
    };

    public async deleteProduct(req: Request, res: Response): Promise<Response> {
        const pool = poolaso();
        const id_producto = parseInt(req.params.id_producto);
        await pool.query('DELETE FROM comida.productos WHERE id_producto = $1', [id_producto]);
        return res.json({
            message: `Product ${id_producto} deleted succesfully`
        });
    };

}

const productsController = new ProductsController();
export default productsController;

