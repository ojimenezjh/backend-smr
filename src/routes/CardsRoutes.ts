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
        this.router.post("/", cardsController.createCard);

        // /api/cards/:cardsID
        this.router.get("/:id", cardsController.getCardbyId);
        this.router.put("/:id", cardsController.updateCard);
        this.router.delete("/:id", cardsController.deleteCard);

    }
}

const cardsRoutes = new CardsRoutes();
export default cardsRoutes.router;