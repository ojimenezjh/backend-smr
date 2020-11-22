import { Router } from 'express';
import productsController from '../controllers/ProductsController';

class ProductsRoutes {
  
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // /api/cards
        this.router.get("/",  productsController.getProducts);

        // /api/cards/:cardsID
        this.router.get("/:id_producto", productsController.getProductbyId);
        this.router.get("/:carta/:products/:id_carta", productsController.getProductbyCard);
        this.router.get("/:products/:producto", productsController.getProductbyName);

        this.router.post("/:carta/:id_carta", productsController.insertProductsByCard);
       

    }
}

const productRoutes = new ProductsRoutes();
export default productRoutes.router;