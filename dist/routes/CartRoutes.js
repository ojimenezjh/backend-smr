"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const CartController_1 = tslib_1.__importDefault(require("../controllers/CartController"));
class CartRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // /api/cards
        this.router.get("/", CartController_1.default.getCart);
        // /api/cards/:cardsID
        this.router.post("/", CartController_1.default.addProduct);
        this.router.put("/:id_detalles_pedidos", CartController_1.default.commentProduct);
        this.router.delete("/:id_detalles_pedidos", CartController_1.default.removeProduct);
    }
}
const cartRoutes = new CartRoutes();
exports.default = cartRoutes.router;
//# sourceMappingURL=CartRoutes.js.map