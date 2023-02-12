const { Schema, model } = require("mongoose");

const schema = new Schema({
  roomNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },

  availability: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = model("Room", schema);
