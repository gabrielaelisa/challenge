import http from 'http';
import express, {Express} from 'express';
import morgan from 'morgan';
import routes from './routes/routes';
import mongoose from 'mongoose';

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

router.use(morgan('dev'));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use('/', routes)


router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET POST');
        return res.status(200).json({});
    }
    next();
});

const httpServer = http.createServer(router);
const PORT: string | number = process.env.PORT ?? 3000;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

export default { router}