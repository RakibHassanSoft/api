const express =require ("express");
const verifyToken  = require ("../middlewere/jwt.js");
const {
  createReview,
  getReviews,
  deleteReview,
} =require ("../controllers/reviewController");

const router = express.Router();

router.post("/createreview", verifyToken, createReview )
router.get("/getreviews/:gigId", getReviews )
router.delete("/deletereview/:id", deleteReview)

module.exports  =router;
