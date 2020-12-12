import { Router } from 'express';
import productsController from '../controllers/ProductsController';

class ProductsRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // /api/cards
        this.router.get("/", productsController.getProducts);

        // /api/cards/:cardsID
        this.router.get("/:id_producto", productsController.getProductbyId);
        this.router.get("/:carta/:products/:id_carta", productsController.getProductbyCard);
        this.router.get("/:products/:producto", productsController.getProductbyName);

        this.router.post("/", productsController.insertProductsByCard);
        this.router.post("/save", productsController.createProduct);

        this.router.put("/:id_producto", productsController.updateProduct);

        this.router.delete("/:id_producto", productsController.deleteProduct);

        this.router.delete("/carta/:id_carta/:id_producto", productsController.deleteProductInCard);

    }
}

const productRoutes = new ProductsRoutes();
export default productRoutes.router;