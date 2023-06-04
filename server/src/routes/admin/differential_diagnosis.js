import express from 'express';

import differentialDiagnose from '../../controllers/admin/differential_diagnose';
import auth from '../../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyTokenAdmin);

routes.route('/')
  .get(differentialDiagnose.list)
  .post(differentialDiagnose.create);

routes.route('/:id')
  .get(differentialDiagnose.read)
  .put(differentialDiagnose.update)
  .delete(differentialDiagnose.delete);

module.exports = routes;
