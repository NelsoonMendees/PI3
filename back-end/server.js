const express = require('express');
const pool = require('./db');
const cors = require('cors');


const ClienteRoutes = require('./src/cliente/routes');
const LoginRoutes = require('./src/login/routes');
const PetRoutes = require('./src/pet/routes');
const AgendamentoRoutes = require('./src/agendamento/routes')

const app = express();
app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});
app.use(cors({
    origin: 'http://localhost:3000'
}));

const port = process.env.port || 3333;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Projeto Integrador - ADS 3");
});

app.use('/api/v1/cliente', ClienteRoutes);
app.use('/api/v1/login', LoginRoutes);
app.use('/api/v1/pet', PetRoutes);
app.use('/api/v1/agendamento', AgendamentoRoutes);





app.listen(port, () => console.log(`app listening on port ${port}`));