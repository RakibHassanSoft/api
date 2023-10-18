const createError = require ("../utils/createError.js");
const Order =require ("../models/orderModel");
const Gig = require("../models/gigModel.js");
const Stripe = require( "stripe");

const intent = async (req, res, next) => {
  try {
    const stripe = new Stripe("sk_test_1234567890");

    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).send({ error: "Gig not found" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: paymentIntent.id,
    });

    await newOrder.save();

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
       res.status(200).send("intent");
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};


 const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    res.status(200).send(orders);
    res.status(200).send("Order");
  } catch (err) {
    next(err);
  }
};



 const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const { gigId, img, title, price, sellerId, buyerId, payment_intent } = req.body;

    // Validate input parameters, if necessary

    const newOrder = new Order({
      gigId,
      img,
      title,
      price,
      sellerId,
      buyerId,
      payment_intent,
      isCompleted: true, // Assuming the order is completed upon creation, modify this as needed
    });

    await newOrder.save();

    res.status(201).send({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

 module.exports={
   confirm,getOrders,intent,createOrder

 }