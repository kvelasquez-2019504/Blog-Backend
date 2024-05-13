'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import apiLimiter from '../src/middlewares/validar-cant-peticiones.js';
import { dbConnection } from './mongo.js';
import publicationRoutes from '../src/publications/publication.routes.js';
import userRoutes from '../src/users/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import commentRoutes from '../src/comments/comment.routes.js';
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.publicationPath ='/Blog/v1/publications';
        this.userPath = '/Blog/v1/users';
        this.authRoutes = '/Blog/v1/auth';
        this.commentRoutes = '/Blog/v1/comments';
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
        this.app.use(apiLimiter);
    }

    routes() {
        this.app.use(this.publicationPath,publicationRoutes);
        this.app.use(this.userPath,userRoutes);
        this.app.use(this.authRoutes,authRoutes);
        this.app.use(this.commentRoutes,commentRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port:', this.port)
        })
    }
}

export default Server;