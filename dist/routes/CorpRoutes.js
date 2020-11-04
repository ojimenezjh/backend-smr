"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const CorpImageController_1 = tslib_1.__importDefault(require("../controllers/CorpImageController"));
class CorpRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // /api/cards
        this.router.get("/api/navigation/:id", CorpImageController_1.default.getImgbyId);
    }
}
const corpRoutes = new CorpRoutes();
exports.default = corpRoutes.router;
//# sourceMappingURL=CorpRoutes.js.map