import mongoose from 'mongoose';
import response from '../../helpers/response';
import request from '../../helpers/request';
import pagination from '../../helpers/pagination';

import _ from 'underscore';

const Appointment = mongoose.model('Appointment');

exports.approve = function (req, res) {
  const attrs = { status: true }
  Appointment.findOneAndUpdate({ _id: req.params.id }, attrs, function (err, item) {
    if (err) return response.sendBadRequest(res, err);
    res.json(item);
  });
};

exports.download = function (req, res) {
  Appointment.findById(req.params.id)
    .exec(function (err, doc) {
      if (err) return response.sendNotFound(res);
      if (!doc.cv) return
      res.download(doc.cv)
    })
};

exports.delete = function (req, res) {
  Appointment.findOne({ _id: req.params.id }, async function (err, item) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
    await Apply.deleteOne(item).exec()
    res.json({ message: 'Item successfully deleted' });
  });
};

exports.list = function(req, res) {
  const query = Object.assign({ docId: req.params.docId }, request.getFilteringOptions(req, ['name']));
  Appointment.paginate(query, request.getRequestOptions(req), function(err, result) {
    if (err) return response.sendNotFound(res);
    pagination.setPaginationHeaders(res, result);
    res.json(result.docs);
  });
};