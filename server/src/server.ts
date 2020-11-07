import express, { request, response } from 'express';

const app = express();


const users = [
    'wesley',
    'Vanildon',
    'ana',
]

app.get('/users', (request, response) => {
    const search = request.query.search;

    const filteredUsers = search ? users.filter(user => user.includes(search as any)) : users

    return response.json(filteredUsers)

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