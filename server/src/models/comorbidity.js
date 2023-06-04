import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const slugify = require('slugify')
const Schema = mongoose.Schema;
const ComorbiditySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
});

ComorbiditySchema.pre('validate', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
});

ComorbiditySchema.plugin(mongoosePaginate);

const Comobidity = mongoose.model("Comorbidity", ComorbiditySchema)

export default Comobidity