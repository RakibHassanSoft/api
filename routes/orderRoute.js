const express =require ("express");
const  verifyToken  =require ("../middlewere/jwt.js");
const {getOrders,confirm,intent,createOrder} = require ("../controllers/orderContrller.js");

// const confirm = require ("../controllers/orderContrller.js");
// const intent = require ("../controllers/orderContrller.js");

const router = express.Router();

router.post("/:gigId", verifyToken, createOrder);
router.get("/getOrders", verifyToken, getOrders);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/confirm", verifyToken, confirm);

module.exports = router;
