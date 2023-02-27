import mongoose from 'mongoose';

const Post = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    tags: { type: Array, default: [] },
    viewsCount: { type: Number, default: 0 },
    imageUrl: { type: String, default: '' },
  },
  { timestamps: true },
);

export default mongoose.model('Post', Post);
