import { Request, Response } from 'express'; // tipos
import knex from '../database/connection'; // conexão com banco de dados

class ItemsController {
    async index(request: Request, response: Response) {

        const items = await knex('items').select('*');
        //tranformando dados para novo formato
        const seriealizedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`
            };
        });

        return response.json(seriealizedItems)
    }
}

export default ItemsController;