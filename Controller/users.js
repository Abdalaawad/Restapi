const users_db = require(`../Schemadb/users_schema`);
const async_wrapper = require(`../Middleware/asyncWrapper`);
const Status = require(`../utility/status_varible`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);
const custom = require(`../utility/class_custom_error`);

const all_users = async_wrapper(async (req, res) => {
  const users = await users_db.find({}, { __v: false });
  res.status(200).json({ Status: Status.Status_Success, data: { users } });
});

const register = async_wrapper(async (req, res) => {
  const { email, password, first_name, last_name, role } = req.body;

  const new_password = await bcrypt.hash(password, 8);
  const new_user = new users_db({
    first_name,
    last_name,
    email,
    password: new_password,
    role,
  });
  const token = jwt.sign(
    {
      email: new_user.email,
      first_name: new_user.first_name,
      role: new_user.role,
    },
    process.env.JWT_SECRET_KEY
  );
  new_user.token = token;
  await new_user.save();
  res.status(201).json({ Status: Status.Status_Success, data: { token } });
});

const login = async_wrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await users_db.findOne({ email: email });

  if (!user) {
    const error = custom.custom_error(
      404,
      "Not found You Should Do Registration first",
      "fail"
    );
    return next(error);
    // const error = new Error();
    // error.status_code = 404;
    // error.message = "Not found You Should Do Registration first";
    // return next(error);
  }

  const my_password = bcrypt.compare(password, user.password);
  console.log(my_password);
  if (user && my_password) {
    const token = jwt.sign(
      { email: user.email, first_name: user.first_name, role: user.role },
      process.env.JWT_SECRET_KEY
    );
    user.token = token;
    await user.save();
    res.status(200).json({ Status: Status.Status_Success, data: { token } });
  }
});

module.exports = {
  all_users,
  register,
  login,
};
