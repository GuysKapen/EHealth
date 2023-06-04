import express from 'express';

import comorbidity from '../../controllers/admin/comorbidity';
import auth from '../../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyTokenAdmin);

routes.route('/')
  .get(comorbidity.list)
  .post(comorbidity.create);

routes.route('/:id')
  .get(comorbidity.read)
  .put(comorbidity.update)
  .delete(comorbidity.delete);

module.exports = routes;
