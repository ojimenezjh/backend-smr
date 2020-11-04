import { Router } from 'express';
import corpController from '../controllers/CorpImageController';

class CorpRoutes {
  
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // /api/cards
        this.router.get("/api/navigation/:id",  corpController.getImgbyId);
    }
}

const corpRoutes = new CorpRoutes();
export default corpRoutes.router;