const Joi = require("joi");
const Mongoose = require("mongoose");
const Joigoose = require("joigoose")(Mongoose);
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const JoiUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
});

const UserSchema = new Mongoose.Schema(Joigoose.convert(JoiUserSchema));

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.pre('save', async function (next) {
  const user = this;
  try {
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = Mongoose.model('User', UserSchema);
