import { Router } from 'express';
import cardsController from '../controllers/CardsController';

class CardsRoutes {
  
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // /api/cards
        this.router.get("/",  cardsController.getCards);

        // /api/cards/:cardsID
        this.router.get("/:id", cardsController.getCardbyId);

    }
}

const cardsRoutes = new CardsRoutes();
export default cardsRoutes.router;