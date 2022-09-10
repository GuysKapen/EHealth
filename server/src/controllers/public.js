import mongoose from 'mongoose';
import response from '../helpers/response';
import request from '../helpers/request';
import pagination from '../helpers/pagination';

const Category = mongoose.model('Category');
const Post = mongoose.model('Post');
const Company = mongoose.model('Company');
const Field = mongoose.model('Field');
const Skill = mongoose.model('Skill');

exports.categories = function (req, res) {
  Category.find({}).exec(function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  })
};

exports.companies = function (req, res) {
  Company.find({}).exec(function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  })
};

exports.skills = function (req, res) {
  Skill.find({}).exec(function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  })
};

exports.fields = function (req, res) {
  Field.find({}).exec(function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  })
};

exports.posts = function (req, res) {
  Post.find({}).populate("category").populate({
    path: "comments", populate: {
      path: "owner",
      populate: {
        path: "profile"
      }
    }
  }).populate({
    path: "owner",
    populate: {
      path: "profile"
    }
  }).exec(function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  })
};

exports.post = function (req, res) {
  Post.findById(req.params.id).populate("category")
    .populate({
      path: "comments", populate: {
        path: "owner",
        populate: {
          path: "profile"
        }
      }
    })
    .populate({
      path: "answers", populate: {
        path: "owner",
        populate: {
          path: "profile"
        }
      }
    })
    .populate({
      path: "owner",
      populate: {
        path: "profile"
      }
    }).exec(function (err, docs) {
      if (err) return response.sendNotFound(res);
      res.json(docs);
    })
};