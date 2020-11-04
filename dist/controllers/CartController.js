"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_1 = require("../database/database");
class CartController {
    getCart(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const pool = database_1.poolaso();
                console.log(database_1.database_usuario());
                const response = yield pool.query('SELECT d.id_detalles_pedidos, p.id_producto, p.producto, d.comentario, p.precio FROM comida.productos p NATURAL JOIN comida.detalles_pedidos d ORDER BY id_detalles_pedidos');
                return res.status(200).json(response.rows);
            }
            catch (e) {
                console.log(e);
                return res.status(500).json('Internal Server Error');
            }
        });
    }
    ;
    getTotal(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const pool = database_1.poolaso();
                console.log(database_1.database_usuario());
                const response = yield pool.query('SELECT * FROM comida.pedidos WHERE id_pedido = $1 AND id_mesa = $2');
                return res.status(200).json(response.rows);
            }
            catch (e) {
                console.log(e);
                return res.status(500).json('Internal Server Error');
            }
        });
    }
    ;
    /*   public async getCardbyId(req: Request, res: Response) : Promise<Response> {
          const pool = poolaso();
          const id = parseInt(req.params.id);
          const response: QueryResult = await pool.query('SELECT * FROM comida.cards WHERE id = $1', [id]);
          return res.json(response.rows);
      }; */
    //PENDIENTE DECIDIR SI SE AÑADE O NO CANTIDAD
    addProduct(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const pool = database_1.poolaso();
                const { id_pedido, id_producto, comentario } = req.body;
                const response = yield pool.query('INSERT INTO comida.detalles_pedidos (id_detalles_pedidos, id_pedido, id_producto, comentario) VALUES ((SELECT CASE WHEN (NOT EXISTS (SELECT id_detalles_pedidos from comida.detalles_pedidos)) THEN 1 ELSE (SELECT MAX(id_detalles_pedidos)+1 FROM comida.detalles_pedidos) END), $1, $2, $3)', [id_pedido, id_producto, comentario]);
                console.log(response.rows);
                return res.json({
                    message: 'Product added succesfully'
                });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json('Internal Server Error');
            }
        });
    }
    ;
    updateProduct(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pool = database_1.poolaso();
            const id_producto = parseInt(req.params.id_producto);
            const response = yield pool.query('UPDATE comida.detalles_pedidos SET cantidad = cantidad+1', [id_producto]);
            return res.json({
                message: `Card ${id_producto} updated succesfully`
            });
        });
    }
    ;
    commentProduct(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(parseInt(req.params.id_producto), req.body.comentario);
            const pool = database_1.poolaso();
            const id_detalles_pedidos = parseInt(req.params.id_detalles_pedidos);
            const comentario = req.body.comentario;
            const response = yield pool.query('UPDATE comida.detalles_pedidos SET comentario = $1 WHERE id_detalles_pedidos = $2', [comentario, id_detalles_pedidos]);
            return res.json({
                message: `Comment updated succesfully in product ${id_detalles_pedidos}`
            });
        });
    }
    ;
    removeProduct(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const pool = database_1.poolaso();
                const id_detalles_pedidos = (req.params.id_detalles_pedidos);
                yield pool.query('DELETE FROM comida.detalles_pedidos WHERE id_detalles_pedidos = $1', [id_detalles_pedidos]); //HACER QUERY QUE VAYA QUITANDO CANTIDAD Y SI ES MENOR A 0 ELIMINE
                return res.json({
                    message: `Product ${id_detalles_pedidos} removed succesfully`
                });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json('Internal Server Error');
            }
        });
    }
    ;
}
const cartController = new CartController();
exports.default = cartController;
//# sourceMappingURL=CartController.js.map