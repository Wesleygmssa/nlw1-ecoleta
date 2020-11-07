import express from 'express';
import knex from '../database/connection';

const routes = express.Router();


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
    })

    return response.json(seriealizedItems)
});

export default routes;
