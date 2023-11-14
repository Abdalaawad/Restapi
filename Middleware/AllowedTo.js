const errors = require(`../utility/class_custom_error`);
module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentuser.role)) {
      const error = errors.custom_error(401, "Not Authorized", "error");
      return next(error);
    }
    next();
  };
};
