const mongoose = require("mongoose");
module.exports.connect = async () => {
  try {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connect success");
  } catch (error) {
    console.log("connect error!!!", error);
    throw error;
  }
};
