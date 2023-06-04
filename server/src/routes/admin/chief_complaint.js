import express from 'express';

import chiefComplaint from '../../controllers/admin/chief_complaint';
import auth from '../../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyTokenAdmin);

routes.route('/')
  .get(chiefComplaint.list)
  .post(chiefComplaint.create);

routes.route('/:id')
  .get(chiefComplaint.read)
  .put(chiefComplaint.update)
  .delete(chiefComplaint.delete);

module.exports = routes;
