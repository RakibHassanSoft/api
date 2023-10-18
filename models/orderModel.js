
const mongoose =require ("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    gigId: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'Gig'
    },
    img: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sellerId: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    buyerId: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    payment_intent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Order = mongoose.model('Order', OrderSchema);
module.exports= Order;
