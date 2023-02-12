const express = require("express");
const Room = require("../models/Room.js");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const list = await Room.find();

      res.send(list);
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  })
  .post(async (req, res) => {
    try {
      const newRoom = await Room.create({
        ...req.body,
      });

      res.status(201).send(newRoom);
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  });

module.exports = router;
