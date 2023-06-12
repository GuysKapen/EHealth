import express from 'express';

import appointments from '../../controllers/doctor/appointments';
import auth from '../../controllers/auth';

const routes = express.Router({ mergeParams: true });

routes.route('/')
  .get(appointments.list)

routes.route('/:id/approve')
  .put(appointments.approve)

routes.route('/:id/download')
  .get(appointments.download)

routes.route('/:id')
  .delete(appointments.delete)


module.exports = routes;
