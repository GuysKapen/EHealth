import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const slugify = require('slugify')
const Schema = mongoose.Schema;
const ChiefComplaintSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
});

ChiefComplaintSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
});

ChiefComplaintSchema.plugin(mongoosePaginate);

const ChiefComplaint = mongoose.model("ChiefComplaint", ChiefComplaintSchema)

export default ChiefComplaint