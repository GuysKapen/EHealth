import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const Schema = mongoose.Schema;
const AppointmentSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  datetime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["scheduled", "canceled", "deleted"],
    default: "scheduled"
  },
  description: {
    type: String
  }
});

AppointmentSchema.plugin(mongoosePaginate);

const Appointment = mongoose.model("Appointment", AppointmentSchema)

export default Appointment