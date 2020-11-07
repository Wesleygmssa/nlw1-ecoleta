import express, { request, response } from 'express';

const app = express();


const users = [
    'wesley',
    'Vanildon',
    'ana',
]

app.get('/users', (request, response) => {
    console.log('Listagem de usuários')
    return response.json(users)

});

app.get('/users/:id', (request, response) => {
    const { id } = request.params;

    const user = users[id as any]

    return response.json(user)
})

app.post('/users', (request, response) => {

    const user = {
        name: 'Wesley',
        email: 'wesleyguerra@...'
    }

    return response.json(user);
});

app.listen(3333, () => {
    console.log('run port 3333');
});