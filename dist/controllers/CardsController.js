"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_1 = require("../database/database");
class CardsController {
    getCards(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const pool = database_1.poolaso();
                console.log(database_1.database_usuario());
                const response = yield pool.query('SELECT * FROM comida.cartas ORDER BY posicion');
                return res.status(200).json(response.rows);
            }
            catch (e) {
                console.log(e);
                return res.status(500).json('Internal Server Error');
            }
        });
    }
    ;
    getCardbyId(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const pool = database_1.poolaso();
                const id = parseInt(req.params.id);
                const response = yield pool.query('SELECT * FROM comida.cartas WHERE id_carta = $1', [id]);
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
const cardsController = new CardsController();
exports.default = cardsController;
//# sourceMappingURL=CardsController.js.map