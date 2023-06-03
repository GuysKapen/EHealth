import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;
const DrugSchema = new Schema({
  brandName: {
    type: String,
    required: true
  },
  genericName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    enum: ["mg", "ml"]
  },
  description: {
    type: String,
  }
});

DrugSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Drug', DrugSchema);
