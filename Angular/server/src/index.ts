import express, { Application } from 'express';


import morgan from 'morgan';// for Http request
import cors from 'cors'; // Let us work with different ports at the same time
import indexroutes  from './routes/indexRoutes';




class Server {

    public app: Application; //To make know the server the type of web we are running 
    
    // In NodeJs the constructor always run in a class 
    constructor() {
        // We run the functions that configure the server
        this.app = express();
        this.config();
        this.routes();
    
    }
    
    config(): void{

        this.app.set('port',process.env.Port || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        
    }

    routes(): void{

        this.app.use(indexroutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port',this.app.get('port'))
        });
    }
}


const server = new Server();
//we start the server
server.start();

