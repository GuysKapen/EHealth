import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;
const CommentSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  commentableId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  commentableType: {
    type: String,
    required: true
  }
});

CommentSchema.plugin(mongoosePaginate);

export default mongoose.model('Comment', CommentSchema);
