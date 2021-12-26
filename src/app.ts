import "reflect-metadata";

import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';
require('dotenv').config();

import userRoutes from './routes/userAccount.routes';
import lookupRoutes from './routes/lookup.routes';
import fabricRoutes from './routes/fabricType.routes';
import genderTypeRoutes from './routes/genderType.routes';
import sleetRoutes from './routes/sleet.routes';
import collectDressRoutes from './routes/collectDress.routes';
import kabaRoutes from './routes/kaba.routes';

const port = process.env.PORT || 3000;
const app:Application = express();
createConnection();

// settings
app.set("port", port);

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use(userRoutes);
app.use(lookupRoutes);
app.use(fabricRoutes);
app.use(genderTypeRoutes);
app.use(sleetRoutes);
app.use(collectDressRoutes);
app.use(kabaRoutes);

export default app;