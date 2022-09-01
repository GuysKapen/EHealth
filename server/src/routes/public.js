import express from 'express';

import publicC from '../controllers/public';

const routes = express.Router({ mergeParams: true });

routes.route('/categories')
  .get(publicC.categories)

routes.route('/posts')
  .get(publicC.posts)

module.exports = routes;
