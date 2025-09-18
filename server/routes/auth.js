const authValidation = require("../middleware/authMiddleware");
const router = require("express").Router();

router.get("/validate", authValidation, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
