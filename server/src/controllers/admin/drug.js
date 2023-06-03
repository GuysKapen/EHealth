import mongoose from 'mongoose';
import response from '../../helpers/response';
import request from '../../helpers/request';
import pagination from '../../helpers/pagination';

import _ from 'underscore';
const Drug = mongoose.model('Drug');

exports.list = function (req, res) {
  const query = Object.assign({ owner: req.params.userId }, request.getFilteringOptions(req, ['name']));
  Drug.paginate(query, request.getRequestOptions(req), function (err, result) {
    if (err) return response.sendNotFound(res);
    pagination.setPaginationHeaders(res, result);
    res.json(result.docs);
  });
};

exports.create = function (req, res) {
  const attrs = _.pick(req.body, "brandName", "genericName", "amount", "unit", "description");
  const item = new Drug(attrs);  
  item.save(function (err, item) {
    if (err) return response.sendBadRequest(res, err);
    response.sendCreated(res, item);
  });
};

exports.read = function (req, res) {
  Drug.findById(req.params.id, function (err, item) {
    if (err) return response.sendNotFound(res);
    res.json(item);
  });
};

exports.update = function (req, res) {
  const attrs = _.pick(req.body, "brandName", "genericName", "amount", "unit", "description");
  Drug.findOneAndUpdate({ _id: req.params.id }, attrs, { new: true }, function (err, item) {
    if (err) return response.sendBadRequest(res, err);
    res.json(item);
  });
};

exports.delete = function (req, res) {
  Drug.findOne({ _id: req.params.id }, async function (err, item) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
    await Drug.deleteOne(item).exec()
    res.json({ message: 'Item successfully deleted' });
  });
};
