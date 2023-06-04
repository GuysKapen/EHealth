import express from 'express';

import investigation from '../../controllers/admin/investigation';
import auth from '../../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyTokenAdmin);

routes.route('/')
  .get(investigation.list)
  .post(investigation.create);

routes.route('/:id')
  .get(investigation.read)
  .put(investigation.update)
  .delete(investigation.delete);

module.exports = routes;
