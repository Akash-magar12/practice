import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (res, userId) => {
  // 1. Create the Token
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  // 2. Define the Cookie Options
  const cookieOptions = {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  // 3. Set the Cookie
  res.cookie("token", token, cookieOptions);

  return token;
};

export default generateTokenAndSetCookie;