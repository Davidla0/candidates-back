const express = require("express");
const { getAllCandidates, getCandidate } = require("./candidate.controller");
const { authenticate } = require("../middleware/auth.middleware")
const router = express.Router();

router.get('/', authenticate, getAllCandidates);
router.get('/:id', getCandidate);
// router.delete('/:id', deleteUser);

module.exports = router;
