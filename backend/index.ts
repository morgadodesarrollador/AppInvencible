
import Server from "./server";
import cors from 'cors';
import usuariosRouter from "./routes/usuarios";
import libreriaRouter from './routes/libreria';
import reservasRouter from './routes/reservas';

import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';


const server = new Server();

//middleware
//body-parser: cogera toda la información delpost (req) y preparará un objeto json. 
server.app.use( bodyParser.urlencoded({ extended: true })); //recibir peticiones x-urlencoded
server.app.use( bodyParser.json()); //infodelosposteos en json

// FileUpload <-- middleware
server.app.use( fileUpload({ useTempFiles: true }) );

//configurar CORS
server.app.use( cors ({ origin: true, credentials: true }));
server.app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

//conectar BD Mongo
mongoose.connect('mongodb://185.166.212.59:27017/Usuarios',
                    { useCreateIndex: true, useNewUrlParser: true },
  ( err ) => {
    if ( err ) throw err;
    console.log('BD Online');
  }
)

//rutas de mi app
server.app.use('/usuarios', usuariosRouter);
server.app.use('/libreria', libreriaRouter);
server.app.use('/reservas', reservasRouter);



//levantar express y como callback le pasamos la función flecha
server.start( ()=> {
    console.log(`servidor corriendo http://${server.host}:${server.port} ...`);
});
