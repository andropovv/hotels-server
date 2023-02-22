const express = require("express");
const Room = require("../models/Room.js");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware.js");
const RoomType = require("../models/RoomType.js");
const User = require("../models/User.js");

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

router.patch("/book", auth, async (req, res) => {
  try {
    const freeRooms = await Room.find({ type: req.body.roomType });
    if (!freeRooms.length) return res.send(null);
    const bookedRoom = await Room.findByIdAndUpdate(
      freeRooms[0]._id,
      { bookedBy: req.user._id, availability: false },
      { new: true }
    );

    const currentUser = await User.findById(req.user._id);
    console.log(bookedRoom);

    await currentUser.updateOne(
      { bookedRooms: [...currentUser.bookedRooms, bookedRoom._id] },
      { new: true }
    );

    res.send(bookedRoom);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

router.patch("/unbook", auth, async (req, res) => {
  try {
    const bookedRoom = await Room.findById(req.body.roomId);

    if (req.user._id !== bookedRoom.bookedBy)
      return res.status(400).send("Пользователь не совпадает");

    await bookedRoom.updateOne(
      { bookedBy: null, availability: true },
      { new: true }
    );

    const currentUser = await User.findById(req.user._id);
    await currentUser.updateOne(
      {
        bookedRooms: currentUser.bookedRooms.filter(
          (r) => r !== req.body.roomId
        ),
      },
      { new: true }
    );

    const updatedRoom = await Room.findById(req.body.roomId);

    res.send(updatedRoom);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

module.exports = router;
