const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const usersRoute = require('./routes/Users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");
const cors = require("cors");
const multer = require('multer');
// const path = require ("path");

dotenv.config();


mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });
  // app.use("/images", express.static(path.join(__dirname, "/public/images")));
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../social app/public/assets/post");
  },
  filename: (req, file, cb) => {
    cb(null,  file.originalname);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {

    console.log(error);
  }
});


app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use(cors({
  origin: 'http://localhost:5173/'
}));
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);





  app.listen(8000, () => {
    console.log('Server is running');
  });
