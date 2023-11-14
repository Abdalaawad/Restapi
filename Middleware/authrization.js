const jwt = require(`jsonwebtoken`);
const async_wrapper = require(`../Middleware/asyncWrapper`);
const errors = require(`../utility/class_custom_error`);

const auth = (req, res, next) => {
  const Auth = req.headers["Authorization"] || req.headers[`authorization`];
  if (!Auth) {
    res.status(401).json({ Status: "Not authorized" });
  }
  const token = Auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentuser = decoded;
    next();
  } catch (err) {
    const error = errors.custom_error(401, "Not authorized", "error");
    return next(error);
  }
};

module.exports = auth;
