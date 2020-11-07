import express, { request, response } from 'express';
import routes from './routes/routes';

const app = express();

app.use(express.json());
app.use(routes); // arquivo de rotas


app.listen(3333, () => {
    console.log('run port 3333');
});