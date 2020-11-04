"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const MesasController_1 = tslib_1.__importDefault(require("../controllers/MesasController"));
class MesasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // /api/register
        // /api/login
        this.router.post("/api/mesa", MesasController_1.default.getMesa);
        // /api/profile
        //this.router.get("/api/statistics", TokenValidation, usersController.profile);
    }
}
const mesasRoutes = new MesasRoutes();
exports.default = mesasRoutes.router;
//# sourceMappingURL=MesasRoutes.js.map