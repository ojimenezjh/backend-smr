import { Router } from 'express';

//import { createGroup } from '../controllers/Group.controller';
// aqui dentro irian también el getGroups,getOneGroup,deleteGroup

const router = Router();

// /api/groups (titulo)
//router.post('/', createGroup);
//router.get('/', getGroups);

// /api/groups/:groupID
//router.get('/:id', getOneGroup);
//router.delete('/:id', deleteGroup);
//router.put('/:id', updateGroup);

// /api/groups/card/cardID
//router.get('card/:idcarta', getGroupsByCard); IMPORTANTE PARA OBTENER TODOS LOS GRUPOS DE UNA CARTA.
//idcarta va en minuscula, en postgres se te pone todo en minuscula por defecto.

export default router;