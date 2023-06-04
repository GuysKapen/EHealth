import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const slugify = require('slugify')
const Schema = mongoose.Schema;
const DifferentialDiagnoseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
});

DifferentialDiagnoseSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
});

DifferentialDiagnoseSchema.plugin(mongoosePaginate);

const DifferentialDiagnose = mongoose.model("DifferentialDiagnose", DifferentialDiagnoseSchema)

export default DifferentialDiagnose