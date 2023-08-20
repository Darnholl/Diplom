const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/Tasks", require("./projects.routes"));
router.use("/user", require("./user.routes"));

module.exports = router;
