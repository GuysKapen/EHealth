import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const slugify = require('slugify')
const Schema = mongoose.Schema;
const ProvisionalDiagnoseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
});

ProvisionalDiagnoseSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
});

ProvisionalDiagnoseSchema.plugin(mongoosePaginate);

const ProvisionalDiagnose = mongoose.model("ProvisionalDiagnose", ProvisionalDiagnoseSchema)

export default ProvisionalDiagnose