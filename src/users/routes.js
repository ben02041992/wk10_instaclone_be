const { Router } = require("express");

const userRouter = Router();

const { userSignIn, getAllUsers, registerUser } = require("./controllers");

const { hashPass, comparePass, checkToken } = require("../middleware/auth");

userRouter.post("/user/registerUser", hashPass, registerUser);

userRouter.post("/user/login", comparePass, checkToken, userSignIn);

userRouter.get("/user/getAllUsers", getAllUsers);

module.exports = userRouter;
