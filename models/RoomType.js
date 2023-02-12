const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  photos: [
    {
      type: String,
    },
  ],
});

module.exports = model("RoomType", schema);
