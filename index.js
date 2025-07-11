require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const ExpressError = require("./utils/ExpressError");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 8080;
const app = express();

const multer = require("multer");
const morgan = require("morgan");
const Merch = require("./models/Merch");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());

app.use(helmet());

const allowedOrigins = [
  "http://localhost:3000",
  "https://rebirth-island.vercel.app",
  "https://www.rebirthisland.store",
  "www.rebirthisland.store",
  "rebirthisland.store",
  "https://rebirth-v2.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(multer({ storage, fileFilter }).array("images"));

app.use(adminRoutes);

app.use(authRoutes);
app.use(userRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Something went wrong" });
});

(async () => {
  try {
    console.log("Connecting to database....");
    await mongoose.connect(process.env.DB_URL);

    app.listen(PORT, () => {
      console.log("Sever is live...");
    });
  } catch (e) {
    throw new ExpressError("Database connection failed", 500);
  }
})();

// (async () => {
//   try {
//     await mongoose.connect(process.env.DB_URL);

//     const result = await Merch.updateMany({}, { soldout: false });
//     console.log(`Updated ${result.modifiedCount} merch items`);

//     mongoose.disconnect();
//   } catch (err) {
//     console.error("Error resetting soldout fields:", err.message);
//     process.exit(1);
//   }
// })();
