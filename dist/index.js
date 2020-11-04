"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importStar(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
// Importamos las rutas
const CardsRoutes_1 = tslib_1.__importDefault(require("./routes/CardsRoutes"));
const GroupsRoutes_1 = tslib_1.__importDefault(require("./routes/GroupsRoutes"));
const UsersRoutes_1 = tslib_1.__importDefault(require("./routes/UsersRoutes"));
const CorpRoutes_1 = tslib_1.__importDefault(require("./routes/CorpRoutes"));
const ProductsRoutes_1 = tslib_1.__importDefault(require("./routes/ProductsRoutes"));
const CartRoutes_1 = tslib_1.__importDefault(require("./routes/CartRoutes"));
const MesasRoutes_1 = tslib_1.__importDefault(require("./routes/MesasRoutes"));
class Server {
    constructor() {
        this.jwt = require('jsonwebtoken');
        this.bcrypt = require('bcryptjs');
        this.app = express_1.default();
        this.router = express_1.default.Router();
        this.config();
        this.routes();
    }
    config() {
        // Puerto de conexión
        this.app.set('port', process.env.PORT || 3000);
        // Middlewares
        //this.app.use(morgan('dev')); // Muestra peticiones app por consola
        this.app.use(cors_1.default()); // Nos configura api
        this.app.use(express_1.json()); // Servidor entiende archivos json
        this.app.use(express_1.default.urlencoded({ extended: false })); // Servidor puede transformar datos formularios html a json
    }
    routes() {
        // Asignamos las rutas
        this.app.use('/api/cards', CardsRoutes_1.default);
        this.app.use('/api/products', ProductsRoutes_1.default);
        this.app.use('/api/carta', ProductsRoutes_1.default);
        this.app.use('/api/products/producto', ProductsRoutes_1.default);
        this.app.use('/api/cart', CartRoutes_1.default);
        this.app.use('/api/groups', GroupsRoutes_1.default);
        this.app.use('/', CorpRoutes_1.default);
        this.app.use('/', UsersRoutes_1.default);
        this.app.use('/', MesasRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'));
        console.log('Server on port ', this.app.get('port'));
    }
    get() {
        this.router.get('/', (req, res) => {
            res.status(200).send('This is an authentication server');
        });
    }
}
// Iniciamos el servidor
const server = new Server();
server.start();
//# sourceMappingURL=index.js.map