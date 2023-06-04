import express from 'express';

import provisionalDiagnose from '../../controllers/admin/provisional_diagnose';
import auth from '../../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyTokenAdmin);

routes.route('/')
  .get(provisionalDiagnose.list)
  .post(provisionalDiagnose.create);

routes.route('/:id')
  .get(provisionalDiagnose.read)
  .put(provisionalDiagnose.update)
  .delete(provisionalDiagnose.delete);

module.exports = routes;
