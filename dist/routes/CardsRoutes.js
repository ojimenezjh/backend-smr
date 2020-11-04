"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const CardsController_1 = tslib_1.__importDefault(require("../controllers/CardsController"));
class CardsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // /api/cards
        this.router.get("/", CardsController_1.default.getCards);
        // /api/cards/:cardsID
        this.router.get("/:id", CardsController_1.default.getCardbyId);
    }
}
const cardsRoutes = new CardsRoutes();
exports.default = cardsRoutes.router;
//# sourceMappingURL=CardsRoutes.js.map