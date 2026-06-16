import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: [true, 'Chat reference is required'],
      index: true,
    },
    content: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'ai'],
        message: '{VALUE} is not a valid role. Must be either "user" or "ai"',
      },
      required: [true, 'Message role is required'],
    },
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model('Message', messageSchema);

export default messageModel;
