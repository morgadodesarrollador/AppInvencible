
import Server from "./server";
import cors from 'cors';
import usuariosRouter from "./routes/usuarios";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const server = new Server();

//middleware
//body-parser: cogera toda la información delpost (req) y preparará un objeto json. 
server.app.use( bodyParser.urlencoded({ extended: true })); //recibir peticiones x-urlencoded
server.app.use( bodyParser.json()); //infodelosposteos en json

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
mongoose.connect('mongodb://185.166.212.59:27017/Ususarios',
                    { useCreateIndex: true, useNewUrlParser: true },
  ( err ) => {
    if ( err ) throw err;
    console.log('BD Online');
  }
)

//rutas de mi app
server.app.use('/usuarios', usuariosRouter);




//levantar express y como callback le pasamos la función flecha
server.start( ()=> {
    console.log(`servidor corriendo en puerto  ${ server.port } ...`);
});
