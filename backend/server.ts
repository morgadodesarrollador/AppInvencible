import express from 'express';

// npm install @types/express  --> para el archivo dedeclaraciones de express
export default  class Server {
    public app : express.Application;
    public port : number = 3000;
    public host : string= '192.168.1.28';
    
    constructor() {
        this.app = express();
    }

    // método que escucha  las peticiones que se hacen al puerto 3000
    // callback es la función a llamar cuando se levante el servidor
    start ( callback: Function) {
        this.app.listen (this.port, this.host, callback());
    }

}
