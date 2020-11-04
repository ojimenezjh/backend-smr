"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_1 = require("../database/database");
class CorpController {
    getImgbyId(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const pool = database_1.poolaso();
                const id = parseInt(req.params.id);
                const response = yield pool.query('SELECT * FROM imgcorp WHERE id = $1', [id]);
                return res.status(200).json(response.rows);
            }
            catch (e) {
                console.log(e);
                return res.status(500).json('Internal Server Error');
            }
        });
    }
    ;
}
const corpController = new CorpController();
exports.default = corpController;
//# sourceMappingURL=CorpImageController.js.map