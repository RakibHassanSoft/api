const express = require ("express");
const {
  createMessage,
  getMessages,
} = require("../controllers/massageController");
const  verifyToken  =require ("../middlewere/jwt.js");

const router = express.Router();

router.post("/createmessage", verifyToken, createMessage);
router.get("/getmessages/:id", verifyToken, getMessages);

module.exports=router
