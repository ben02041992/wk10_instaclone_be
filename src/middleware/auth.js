const bcrypt = require("bcrypt");

const User = require("../users/model");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const hashPass = async (req, res, next) => {
  const { password } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPass;
    next();
  } catch (error) {
    res.status(501).json({ message: error.message, error });
  }
};

const comparePass = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        message: "not found",
        error: error.message,
      });
    }

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(400).json({
        message: error.message,
        error,
      });
    }
    req.user = { id: user.id, email: user.email, username: user.username };

    next();
  } catch (error) {
    res.status(501).json({ message: error.message, error });
  }
};

const checkToken = async (req, res, next) => {
  //get token
  const token = req.cookies.authToken;
  //if no token, return 403
  if (!token) {
    res.clearCookie("authToken");
    return res
      .status(403)
      .json({ message: "Invalid token", error: error.message });
  }
  //verification of token
  try {
    const tokenVerified = await JWT.verify(token, process.env.JWT_SECRET);
    req.user = tokenVerified;

    next();
  } catch (error) {
    res.clearCookie("authToken");
    res.status(501).json({
      success: false,
      message: "Internal error",
      error: error.message,
    });
  }
};

module.exports = { hashPass, comparePass, checkToken };
