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
        //this.router.post("/upload", cardsController.postPhoto);

        // /api/cards/:cardsID
        this.router.get("/:id_carta", cardsController.getCardbyId);
        this.router.put("/:id_carta", cardsController.updateCard);
        this.router.delete("/:id_carta", cardsController.deleteCard);

    }
}

const cardsRoutes = new CardsRoutes();
export default cardsRoutes.router;