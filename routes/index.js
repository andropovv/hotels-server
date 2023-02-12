const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes.js"));
router.use("/rooms", require("./rooms.routes.js"));
router.use("/roomTypes", require("./roomTypes.routes.js"));

module.exports = router;
