"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_1 = require("../database/database");
class MesasController {
    getMesa(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const pool = database_1.poolaso();
                const clave = req.body.clave;
                const response = yield pool.query('SELECT id_mesa FROM comida.mesas WHERE clave = $1', [clave]);
                if (response.rows.length <= 0)
                    return res.status(400).json('Mesa inexistente');
                else {
                    return res.status(200).json(response.rows);
                }
                ;
            }
            catch (e) {
                console.log(e);
                return res.status(500).json('Internal Server Error');
            }
        });
    }
    ;
}
const mesasController = new MesasController();
exports.default = mesasController;
//# sourceMappingURL=MesasController.js.map