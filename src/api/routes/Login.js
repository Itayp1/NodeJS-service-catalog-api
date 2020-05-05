const router = require("express").Router(),
  ValidateJwt = require("../../middleware/ValidateJwt"),
  verifyUserByToken = require("../../middleware/verifyUserByToken");

router.get("/", verifyUserByToken, (req, res) => {
  return res.json({ status: "Registration" });
});

router.get("/verifyToken", ValidateJwt, (req, res) => {
  const { profile } = res.locals.jwt;

  return res.json({ status: "Registration", profile });
});
module.exports = router;
