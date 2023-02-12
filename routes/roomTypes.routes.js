const express = require("express");
const RoomType = require("../models/RoomType.js");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await RoomType.find();

    res.send(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

module.exports = router;
