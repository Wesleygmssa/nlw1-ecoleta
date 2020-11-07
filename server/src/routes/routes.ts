import express, { response } from 'express';
import knex from '../database/connection';

import PointsController from '../controllers/PointsController';

const routes = express.Router();
const pointsController = new PointsController();

routes.get('/items', async (request, response) => {

    const items = await knex('items').select('*');
    // console.log(items)
    //tranformando dados para novo formato
    const seriealizedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`
        };
    });

    return response.json(seriealizedItems)
});

routes.post('/points', pointsController.create);
routes.get('/points/:id', pointsController.show);

export default routes;
