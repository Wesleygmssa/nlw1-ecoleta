import express, { response } from 'express';

import PointsController from '../controllers/PointsController';
import ItemsController from '../controllers/ItemsController';

const routes = express.Router();

//instancia da classes
const pointsController = new PointsController();
const itemsController = new ItemsController();

//rotas
routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;
