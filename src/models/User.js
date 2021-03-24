const joi = require("joi");
const mongoose = require("mongoose");
const joigoose = require("joigoose")(mongoose);
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const joiUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  name: joi.string().required(),
});

const UserSchema = new mongoose.Schema(joigoose.convert(joiUserSchema));

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.pre("save", async function (next) {
  const user = this;
  try {
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", UserSchema);
