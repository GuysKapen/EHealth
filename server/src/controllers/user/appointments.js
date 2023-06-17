import mongoose from 'mongoose';
import response from '../../helpers/response';
import request from '../../helpers/request';
import pagination from '../../helpers/pagination';

import _ from 'underscore';

const Appointment = mongoose.model('Appointment');

exports.list = function (req, res) {
  if (!req.currentUser.canRead(req.locals.user)) return response.sendForbidden(res);
  const query = Object.assign({ owner: req.params.userId }, request.getFilteringOptions(req, ['name']));
  Appointment.paginate(query, Object.assign(request.getRequestOptions(req), {
    populate: [{
      populate: {
        path: "patient",
        populate: {
          path: "profile",
        },
      },
      populate: {
        path: "doctor",
        populate: {
          path: "profile",
        },
      },
    },]
  }), function (err, result) {
    if (err) return response.sendNotFound(res);
    pagination.setPaginationHeaders(res, result);
    res.json(result.docs);
  });
};

exports.create = function (req, res) {
  const user = req.locals.user;
  if (!req.currentUser.canEdit(user)) return response.sendForbidden(res);

  const attrs = _.pick(req.body, "datetime", "description", "doctorId", "status")
  const item = new Appointment(attrs);
  item.patient = user._id;
  item.doctor = attrs.doctorId;
  item.save(function (err, item) {
    if (err) return response.sendBadRequest(res, err);

    user.recruitments.push(item);
    user.save(function (err, user) {
      if (err) return response.sendBadRequest(res, err);
      response.sendCreated(res, item);
    });
  });
};

exports.read = function (req, res) {
  Appointment.findById(req.params.id, function (err, item) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canRead(item)) return response.sendForbidden(res);
    res.json(item);
  });
};

exports.update = function (req, res) {

  const attrs = _.pick(req.body, "datetime", "description", "status")
  Appointment.findOneAndUpdate({ _id: req.params.id }, attrs, { new: true }, function (err, item) {
    if (err) return response.sendBadRequest(res, err);
    if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
    res.json(item);
  });
};

exports.delete = function (req, res) {
  Appointment.findOne({ _id: req.params.id }, async function (err, item) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
    await Appointment.deleteOne(item).exec()
    res.json({ message: 'Item successfully deleted' });
  });
};