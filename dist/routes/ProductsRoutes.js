"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const ProductsController_1 = tslib_1.__importDefault(require("../controllers/ProductsController"));
class ProductsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // /api/cards
        this.router.get("/", ProductsController_1.default.getProducts);
        // /api/cards/:cardsID
        this.router.get("/:id_producto", ProductsController_1.default.getProductbyId);
        this.router.get("/:carta/:products/:id_carta", ProductsController_1.default.getProductbyCard);
        this.router.get("/:products/:producto", ProductsController_1.default.getProductbyName);
    }
}
const productRoutes = new ProductsRoutes();
exports.default = productRoutes.router;
//# sourceMappingURL=ProductsRoutes.js.map