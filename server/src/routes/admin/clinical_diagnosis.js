import express from 'express';

import clinicalDiagnose from '../../controllers/admin/clinical_diagnose';
import auth from '../../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyTokenAdmin);

routes.route('/')
  .get(clinicalDiagnose.list)
  .post(clinicalDiagnose.create);

routes.route('/:id')
  .get(clinicalDiagnose.read)
  .put(clinicalDiagnose.update)
  .delete(clinicalDiagnose.delete);

module.exports = routes;
