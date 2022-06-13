import express from 'express';
import controller from '../controller/controller';
const router = express.Router();

router.get('/heartbeat', controller.getHeartbeat);
router.get('/address', controller.getAddress);
export = router;