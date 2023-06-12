
import express from 'express';

import appointments from './appointments';
import auth from '../../controllers/auth';

const routes = express.Router();

routes.use(auth.verifyTokenDoctor);

routes.use('/:doctorId/appointments', appointments);

module.exports = routes;
