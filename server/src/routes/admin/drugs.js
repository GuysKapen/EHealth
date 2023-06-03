import express from 'express';

import drug from '../../controllers/admin/drug';
import auth from '../../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyTokenAdmin);

routes.route('/')
  .get(drug.list)
  .post(drug.create);

routes.route('/:id')
  .get(drug.read)
  .put(drug.update)
  .delete(drug.delete);

module.exports = routes;
