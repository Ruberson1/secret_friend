import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import https from 'https';
import http from 'http';
import siteRoutes from './routes/site';
import adminRoutes from './routes/admin';
import { requestInterceptor } from './utils/request_interceptor';

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.all('*', requestInterceptor);

app.use('/admin', adminRoutes);
app.use('/', siteRoutes);

const runServer = (port: number, server: http.Server) => {
    server.listen(port, () => {
        console.log(`🚀 Runnin at PORT ${port}`);
    })
}

const regularServer = http.createServer(app);

if(process.env.NODE_ENV === 'production') {
    // TODO: config ssl
    //TODO: rodar server na porta 80 e na 443
} else {
    const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
    runServer(serverPort, regularServer);
}