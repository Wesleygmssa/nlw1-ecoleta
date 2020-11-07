import express from 'express';

const app = express();

app.get('/users', (request, response) => {
    console.log('Listagem de usuários')

    response.json([
        'wesley',
        'Vanildon',
        'ana'
    ]);
});

app.listen(3333, () => {
    console.log('run port 3333');
});