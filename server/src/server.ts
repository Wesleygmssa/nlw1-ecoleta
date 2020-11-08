import express, { request, response } from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes/routes';

const app = express();

//poder fazer a api para front end
app.use(cors(
    // origin: 'www.'
));

//recebendo arquivo JSON
app.use(express.json());

// arquivo de rotas
app.use(routes);

//acessando a imagem de forma direta
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(3333, () => {
    console.log('run port 3333');
});