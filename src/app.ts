import "reflect-metadata";

import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';
require('dotenv').config();
import helmet from "helmet";

import authRoutes from './routes/auth.routes';
import lookupRoutes from './routes/lookup.routes';
import fabricRoutes from './routes/fabricType.routes';
import genderTypeRoutes from './routes/genderType.routes';
import sleetRoutes from './routes/sleet.routes';
import collectDressRoutes from './routes/collectDress.routes';
import kabaRoutes from './routes/kaba.routes';
import sleeveRoutes from './routes/sleeve.routes';
import trouserRoutes from './routes/trouser.routes';
import { checkJwt } from "./middlewares/checkJwt";

const port = process.env.PORT || 3000;
const app:Application = express();
createConnection()

// settings
app.set("port", port);

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
// app.use(checkJwt);

// routes
app.use(authRoutes);
app.use(lookupRoutes);
app.use(fabricRoutes);
app.use(genderTypeRoutes);
app.use(sleetRoutes);
app.use(collectDressRoutes);
app.use(kabaRoutes);
app.use(sleeveRoutes);
app.use(trouserRoutes);

export default app;