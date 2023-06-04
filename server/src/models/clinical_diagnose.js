import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const slugify = require('slugify')
const Schema = mongoose.Schema;
const ClinicalDiagnoseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
});

ClinicalDiagnoseSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
});

ClinicalDiagnoseSchema.plugin(mongoosePaginate);

const ClinicalDiagnose = mongoose.model("ClinicalDiagnose", ClinicalDiagnoseSchema)

export default ClinicalDiagnose