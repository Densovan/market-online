const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc Register
// @route POST /auth
// @access Public
exports.register = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const isEmail = await User.findOne({ email });
    if (isEmail)
      return res.status(401).json({ msg: "This email is already exist" });

    //Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    const userObject = {
      fullname,
      email,
      password: passwordHash,
    };
    const foundUser = await User.create(userObject);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: foundUser._id,
          fullname: foundUser.fullname,
          role: foundUser.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { fullname: foundUser.fullname },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    // Send accessToken containing username and roles
    res.json({ accessToken, foundUser });
  } catch (error) {
    return res.status(500).json({ msg: "server error" });
  }
};

// @desc Login
// @route POST /auth
// @access Public
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser)
      return res
        .status(401)
        .json({ msg: "your email or password is incorrect!" });
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match)
      return res
        .status(401)
        .json({ msg: "your email or password is incorrect!" });

    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: foundUser._id,
          fullname: foundUser.fullname,
          role: foundUser.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { fullname: foundUser.fullname },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    // Send accessToken containing username and roles
    res.json({ accessToken });
  } catch (error) {
    return res.status(500).json({ msg: "server error" });
  }
};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
exports.refresh = async (req, res) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

    const refreshToken = cookies.jwt;

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden" });

        const foundUser = await User.findOne({
          fullname: decoded.fullname,
        }).exec();

        if (!foundUser)
          return res.status(401).json({ message: "Unauthorized" });

        const accessToken = jwt.sign(
          {
            UserInfo: {
              id: foundUser._id,
              fullname: foundUser.fullname,
              role: foundUser.role,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );

        res.json({ accessToken });
      }
    );
  } catch (error) {
    return res.status(500).json({ msg: "server error" });
  }
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
exports.logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};
