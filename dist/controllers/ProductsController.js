"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_1 = require("../database/database");
class ProductsController {
    getProducts(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const pool = database_1.poolaso();
                console.log(database_1.database_usuario());
                const response = yield pool.query('SELECT * FROM comida.productos ORDER BY id_producto');
                return res.status(200).json(response.rows);
            }
            catch (e) {
                console.log(e);
                return res.status(500).json('Internal Server Error');
            }
        });
    }
    ;
    getProductbyId(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const pool = database_1.poolaso();
                const id_producto = parseInt(req.params.id_producto);
                const response = yield pool.query('SELECT * FROM comida.productos WHERE id_producto = $1', [id_producto]);
                return res.json(response.rows);
            }
            catch (e) {
                console.log(e);
                return res.status(500).json('Internal Server Error');
            }
        });
    }
    ;
    getProductbyCard(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const pool = database_1.poolaso();
                const id_carta = (req.params.id_carta);
                const response = yield pool.query('SELECT p.* FROM comida.productos p NATURAL JOIN comida.carta_producto WHERE id_carta = $1', [id_carta]);
                console.log(id_carta);
                console.log(response.rows);
                console.log('consulta realizada');
                return res.json(response.rows);
            }
            catch (e) {
                console.log(e);
                return res.status(500).json('Internal Server Error');
            }
        });
    }
    ;
    getProductbyName(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const pool = database_1.poolaso();
                const producto = (req.params.producto);
                const response = yield pool.query('SELECT * FROM comida.search_bar_producto($1)', [producto]);
                console.log(producto);
                return res.json(response.rows);
            }
            catch (e) {
                console.log(e);
                return res.status(500).json('Internal Server Error');
            }
        });
    }
    ;
}
const productsController = new ProductsController();
exports.default = productsController;
//# sourceMappingURL=ProductsController.js.map