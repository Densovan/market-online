const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");

const app = express();
dotenv.config();
//============>Middleware<=============
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5000",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
//=========>>Route<<==============
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use("/api", cartRoute);
//========>>Dastabase<<========
connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server run on Port ${PORT}`));
