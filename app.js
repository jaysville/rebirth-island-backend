require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const ExpressError = require("./utils/ExpressError");
const cors = require("cors");

const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

const app = express();

const multer = require("multer");

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

const allowedOrigins = [
  "http://localhost:3000",
  "https://rebirth-island.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
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

    app.listen(8080, () => {
      console.log("Sever is live...");
    });
  } catch (e) {
    throw new ExpressError("Database connection failed", 500);
  }
})();
