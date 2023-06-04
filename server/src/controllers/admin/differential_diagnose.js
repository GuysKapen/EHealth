import mongoose from 'mongoose';
import response from '../../helpers/response';
import request from '../../helpers/request';
import pagination from '../../helpers/pagination';

import _ from 'underscore';
const DifferentialDiagnose = mongoose.model('DifferentialDiagnose');

exports.list = function (req, res) {
  const query = Object.assign({ owner: req.params.userId }, request.getFilteringOptions(req, ['name']));
  DifferentialDiagnose.paginate(query, request.getRequestOptions(req), function (err, result) {
    if (err) return response.sendNotFound(res);
    pagination.setPaginationHeaders(res, result);
    res.json(result.docs);
  });
};

exports.create = function (req, res) {
  const attrs = _.pick(req.body, "name");
  const item = new DifferentialDiagnose(attrs);  
  item.save(function (err, item) {
    if (err) return response.sendBadRequest(res, err);
    response.sendCreated(res, item);
  });
};

exports.read = function (req, res) {
  DifferentialDiagnose.findById(req.params.id, function (err, item) {
    if (err) return response.sendNotFound(res);
    res.json(item);
  });
};

exports.update = function (req, res) {
  const attrs = _.pick(req.body, "name");
  DifferentialDiagnose.findOneAndUpdate({ _id: req.params.id }, attrs, { new: true }, function (err, item) {
    if (err) return response.sendBadRequest(res, err);
    res.json(item);
  });
};

exports.delete = function (req, res) {
  DifferentialDiagnose.findOne({ _id: req.params.id }, async function (err, item) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
    await DifferentialDiagnose.deleteOne(item).exec()
    res.json({ message: 'Item successfully deleted' });
  });
};
