require("dotenv").config();
const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

const connectDB = async () => {
  const connection = await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  });

  console.log(`MongoDB Connected: ${connection.connection.host}`);
};

module.exports = connectDB;
