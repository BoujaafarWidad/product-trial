import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import userDataRoutes from './routes/user-data';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', authRoutes);
app.use('/products', productRoutes);
app.use('/user', userDataRoutes);

export default app;
