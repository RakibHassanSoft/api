const mongoose =require ("mongoose");
const { Schema } = mongoose;
const ConversationSchema = new Schema(
  {
    _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId
    },
    sellerId: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    buyerId: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    readBySeller: {
      type: Boolean,
      required: true,
    },
    readByBuyer: {
      type: Boolean,
      required: true,
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);


const Conversation = mongoose.model('Conversation', ConversationSchema);
module.exports= Conversation;
