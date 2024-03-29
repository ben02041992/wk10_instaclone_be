require("dotenv").config();
const express = require("express");
const cors = require("cors");

const User = require("./users/model");

const userRouter = require("./users/routes");

const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());

app.use(cors);

app.use(userRouter);

const syncTables = () => {
  User.sync();
};

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  syncTables();
});
