import express, { json, Application, Router } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import usersController  from './controllers/UsersController';

// Importamos las rutas
import cardsRoutes from './routes/CardsRoutes';
import groupsRoutes from './routes/GroupsRoutes';
import usersRoutes from './routes/UsersRoutes';
import corpRoutes from './routes/CorpRoutes';
import productRoutes from './routes/ProductsRoutes'
import cartRoutes from './routes/CartRoutes'
import mesasRoutes from './routes/MesasRoutes'

class Server {

    public app: Application;
    public router: Router;
    public jwt = require('jsonwebtoken');
    public bcrypt  =  require('bcryptjs');

    constructor(){        
        this.app = express();  
        this.router = express.Router();
        this.config();
        this.routes();
    }

    config(): void {
        // Puerto de conexión
        this.app.set('port', process.env.PORT || 4000);

        // Middlewares
        //this.app.use(morgan('dev')); // Muestra peticiones app por consola
        this.app.use(cors()); // Nos configura api
        this.app.use(json()); // Servidor entiende archivos json
        this.app.use(express.urlencoded({extended: false})); // Servidor puede transformar datos formularios html a json
    }

    

    routes(): void {
        // Asignamos las rutas
        this.app.use('/api/cards', cardsRoutes);
        this.app.use('/api/products', productRoutes);
        this.app.use('/api/carta', productRoutes);
        this.app.use('/api/products/producto', productRoutes);
        this.app.use('/api/cart', cartRoutes);
        this.app.use('/api/groups', groupsRoutes);
        this.app.use('/', corpRoutes);
        this.app.use('/', usersRoutes);
        this.app.use('/', mesasRoutes);

    }
    start(): void {
        this.app.listen(this.app.get('port'));
        console.log('Server on port ', this.app.get('port'));
    }

    get(): void{

    this.router.get('/', (req, res) => {
        res.status(200).send('This is an authentication server');
    });
    }
    
}

// Iniciamos el servidor
const server = new Server();
server.start();