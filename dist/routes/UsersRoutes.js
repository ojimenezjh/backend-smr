"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const UsersController_1 = tslib_1.__importDefault(require("../controllers/UsersController"));
const database_1 = require("../database/database");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // /api/register
        this.router.post("/api/register", UsersController_1.default.createUser);
        // /api/login
        this.router.post("/api/login", database_1.database, UsersController_1.default.getUsers);
        // /api/profile
        //this.router.get("/api/statistics", TokenValidation, usersController.profile);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
//# sourceMappingURL=UsersRoutes.js.map