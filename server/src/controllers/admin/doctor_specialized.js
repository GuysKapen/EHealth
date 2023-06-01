import mongoose from 'mongoose';
import response from '../../helpers/response';
import request from '../../helpers/request';
import pagination from '../../helpers/pagination';

import _ from 'underscore';
const DoctorSpecialized = mongoose.model('DoctorSpecialized');

exports.list = function (req, res) {
  if (!req.currentUser.canRead(req.locals.user)) return response.sendForbidden(res);
  const query = Object.assign({ owner: req.params.userId }, request.getFilteringOptions(req, ['name']));
  DoctorSpecialized.paginate(query, request.getRequestOptions(req), function (err, result) {
    if (err) return response.sendNotFound(res);
    pagination.setPaginationHeaders(res, result);
    res.json(result.docs);
  });
};

exports.create = function (req, res) {
  const attrs = _.pick(req.body, "name");
  const item = new DoctorSpecialized(attrs);  
  item.save(function (err, item) {
    if (err) return response.sendBadRequest(res, err);
    response.sendCreated(res, item);
  });
};

exports.read = function (req, res) {
  DoctorSpecialized.findById(req.params.id, function (err, item) {
    if (err) return response.sendNotFound(res);
    res.json(item);
  });
};

exports.update = function (req, res) {
  DoctorSpecialized.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, item) {
    if (err) return response.sendBadRequest(res, err);
    res.json(item);
  });
};

exports.delete = function (req, res) {
  DoctorSpecialized.findOne({ _id: req.params.id }, async function (err, item) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
    await DoctorSpecialized.deleteOne(item).exec()
    res.json({ message: 'Item successfully deleted' });
  });
};
