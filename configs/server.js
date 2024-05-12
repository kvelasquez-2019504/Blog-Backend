'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import publicationRoutes from '../src/publications/publication.routes.js';
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.publicationPath ='/Blog/v1/publications';
        this.connectDB();
        this.middlewares();
        this.routes();
    }
    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.publicationPath,publicationRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port:', this.port)
        })
    }
}

export default Server;