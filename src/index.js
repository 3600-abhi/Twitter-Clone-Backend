import express from 'express';
import { ServerConfig, DatabaseConfig } from './config/index.js';
import apiRoutes from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async function () {
    console.log(`Successfully started server at PORT : ${ServerConfig.PORT}`);
    await DatabaseConfig.connectToMongoDB();
})