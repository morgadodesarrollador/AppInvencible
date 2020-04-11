'use strinct'
//librerías
const express = require('express');
const bodyparser= require('body-parser');

//ejecución del servidor de express
const app = express();


//rutas
const reservas_routes= require('./routes/reservas');


//middleware
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})

//redefinición de rutas
app.use('/appturistico', reservas_routes);

//exportado del módulo
module.exports = app;