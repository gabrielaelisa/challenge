import express from 'express';
import controller from '../controller/controller';
const router = express.Router();

router.get('/heartbeat', controller.getHeartbeat);
router.get('/address', controller.getAddress);
router.get('/historic', controller.getHistoricAddresses);
router.get('/historic-structured', controller.getAddressStructured);
router.post('/distance', controller.postDistance);
export = router;