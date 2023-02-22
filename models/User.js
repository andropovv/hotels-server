const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      enum: ["male", "female"],
    },
    bookedRooms: [
      {
        type: String,
      },
    ],
    admin: Boolean,
  },

  { timestamps: true }
);

module.exports = model("User", schema);
