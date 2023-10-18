const express =require ("express");
const {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} =require ("../controllers/conversationController");
const verifyToken  =require ("../middlewere/jwt.js");

const router = express.Router();

router.get("/getConversations", verifyToken, getConversations);
router.post("/createConversation", verifyToken, createConversation);
router.get("/getSingleConversation/single/:id", verifyToken, getSingleConversation);
router.put("/updateConversation/:id", verifyToken, updateConversation);

module.exports= router;
