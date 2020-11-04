import { Router } from 'express';
import mesasController from '../controllers/MesasController';


class MesasRoutes {
  
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // /api/register
        // /api/login
        this.router.post("/api/mesa" ,  mesasController.getMesa);
        // /api/profile
        //this.router.get("/api/statistics", TokenValidation, usersController.profile);
    }

}

const mesasRoutes = new MesasRoutes();

export default mesasRoutes.router;