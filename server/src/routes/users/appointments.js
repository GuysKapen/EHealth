import express from 'express';

import appointments from '../../controllers/user/appointments';
import auth from '../../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyToken);

routes.route('/')
  .get(appointments.list)
  .post(appointments.create);

routes.route('/:id')
  .get(appointments.read)
  .put(appointments.update)
  .delete(appointments.delete);

module.exports = routes;
