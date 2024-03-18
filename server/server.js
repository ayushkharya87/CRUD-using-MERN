const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors")
const PORT = 5000;


// cors
app.use(cors());

// for convert data to json, it is a middleware
app.use(express.json());

// db connection
mongoose
  .connect("mongodb://localhost:27017/crud")
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => {
    console.log(error);
  });

// user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

// routes
// create user
app.post("/createuser", async (req, res) => {
  try {
    const bodyData = req.body;
    const user = new User(bodyData);
    const userData = await user.save();
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
});

// read all user
app.get("/readuser", async (req, res) => {
  try {
    const userData = await User.find({});
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
});

// read by id
app.get("/read/:id", async (req, res) => {
  try {
    const id = req.params.id; // to find user id
    const user = await User.findById({ _id: id });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

// update user
app.put("/updateuser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

// delete user
app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete({ _id: id});
    res.send(user);
  } catch (error) {
    res.send(error);
  }
})

app.listen(PORT, () => {
  console.log("server start");
});
