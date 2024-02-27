const User = require("./model");
const JWT = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    res.status(201).json({ message: "user created", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
  console.log(res);
};

const userSignIn = async (req, res) => {
  const { id, email, username } = req.body;

  try {
    const token = JWT.sign({ id, email, username }, process.env.JWT_SECRET);

    res.cookie("authToken", token, { httpOnly: true });

    return res.status(200).json({
      message: `${username} logged in`,
      token,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll({});
    return res.status(200).json({ message: "users fetched", allUsers });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

module.exports = { registerUser, userSignIn, getAllUsers };
