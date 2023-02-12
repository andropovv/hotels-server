const roomTypesMock = require("../mock/roomTypes.json");
const roomsMock = require("../mock/rooms.json");

const Room = require("../models/Room");
const RoomType = require("../models/RoomType");

module.exports = async () => {
  const Rooms = await Room.find();
  if (Rooms.length !== roomsMock.length) {
    await createInitialEntity(Room, roomsMock);
  }

  const RoomTypes = await RoomType.find();
  if (RoomTypes.length !== roomTypesMock.length) {
    await createInitialEntity(RoomType, roomTypesMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
      } catch (error) {
        return error;
      }
    })
  );
}
