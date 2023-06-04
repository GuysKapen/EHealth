import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const slugify = require('slugify')
const Schema = mongoose.Schema;
const InvestigationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
});

InvestigationSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
});

InvestigationSchema.plugin(mongoosePaginate);

const Investigation = mongoose.model("Investigation", InvestigationSchema)

export default Investigation