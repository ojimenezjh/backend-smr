import { Router } from 'express';
import usersController from '../controllers/UsersController';
import {database} from '../database/database';

class UserRoutes {
  
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // /api/register
        this.router.post("/api/register", usersController.createUser);
        // /api/login
        this.router.post("/api/login", database,  usersController.getUsers);
        // /api/profile
        //this.router.get("/api/statistics", TokenValidation, usersController.profile);
    }

}

const userRoutes = new UserRoutes();

export default userRoutes.router;