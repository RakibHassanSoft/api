const mongoose = require( "mongoose");
const { Schema } = mongoose;

const MessageSchema = new Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  desc: {
    type: String,
    required: true,
  },
},{
  timestamps:true
});
const Message = mongoose.model('Message', MessageSchema);
module.exports= Message;
