const mongoose = require(`mongoose`);
const UserRole = require(`../utility/UserRole`);

const users = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: [UserRole.ADMIN, UserRole.MANAGER, UserRole.USER],
    default: UserRole.USER,
  },
});

module.exports = mongoose.model(`User`, users);
