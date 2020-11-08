import { Request, Response } from 'express'; // formato do objeto, tipo
import knex from '../database/connection';  // conexão com banco de dados

class ItemsController {
    async index(request: Request, response: Response) {

        //buscando todos os dados no banco
        const items = await knex('items').select('*');

        //tranformando dados para novo formato usando map
        const seriealizedItems = items.map(item => {

            //modificando dados para ser retornado para front-end em JSON
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`
            };
        });

        return response.json(seriealizedItems);
    }
}

export default ItemsController;