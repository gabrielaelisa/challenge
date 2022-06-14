import http from 'http';
import express, {Express} from 'express';
import morgan from 'morgan';
import routes from './routes/routes';
import mongoose from 'mongoose';

const Cors = require("cors");

const mongoString = process.env.DATABASE_URL || '';

mongoose.connect(mongoString);
const database = mongoose.connection;

const router: Express = express();

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

router.use(Cors())
router.use(morgan('dev'));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use('/', routes)

const httpServer = http.createServer(router);
const PORT: string | number = process.env.PORT ?? 3000;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

export default { router}