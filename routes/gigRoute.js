const express =require ("express");
const {
  createGig,
  deleteGig,
  getGig,
  getGigs
} = require ("../controllers/gigController");
const verifyToken  =require ("../middlewere/jwt.js");
const router = express.Router();

router.post("/createGig", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/getGig/single/:id", getGig);
router.get("/getGigs", getGigs);

module.exports= router;
