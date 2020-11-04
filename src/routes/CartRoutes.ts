import { Router } from 'express';
import cartController from '../controllers/CartController';

class CartRoutes {
  
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // /api/cards
        this.router.get("/",  cartController.getCart);

        // /api/cards/:cardsID
        this.router.post("/", cartController.addProduct);
        this.router.put("/:id_detalles_pedidos", cartController.commentProduct);
        this.router.delete("/:id_detalles_pedidos", cartController.removeProduct);      

    }
}

const cartRoutes = new CartRoutes();
export default cartRoutes.router;