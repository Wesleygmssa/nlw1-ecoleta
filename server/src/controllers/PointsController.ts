import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

    //lista ponto filtrados
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://192.168.1.12:3333/uploads/${point.image}`,
            };
        });

        return response.json(serializedPoints);
    }

    /* exibir apenas um ponto de coleta especifico */
    async show(request: Request, response: Response) {

        const { id } = request.params;// pgando o id pela url

        const point = await knex('points').where('id', id).first(); // 

        //se não encontrar nenhum ponto retorna um erro
        if (!point) {
            return response.status(400).json({ message: 'Point not found' })
        }

        /* 
        SELECT * FROM items
          JOIN point_items ON items.id = point_items.item_id
          WHERE point_items.point_id = id
        */

        //relacinamentos entre tabelas
        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');


        return response.json({ point, items })
    }

    //criar banco ponto
    async create(request: Request, response: Response) {

        //recebendo dados do formulario
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items // recebendo um array [number]
        } = request.body;

        const trx = await knex.transaction();

        //objeto com todos dados
        const point = {

            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,

        }

        //quando e salvo banco de dados retorna o id
        const insertIds = await trx('points').insert(point);

        const point_id = insertIds[0]; //ids dos registro que foram inseridos

        //percorrendo o array de mumeros
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id,
            }
        });

        await trx('point_items').insert(pointItems);

        await trx.commit(); // faz os insert no bancos de dados

        return response.json({
            id: point_id,
            ...point,

        })
    }
};

export default PointsController;