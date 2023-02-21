const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');

const register = async (req, res) => {
  const { email, password, name } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const verificationToken = uuidv4();

  const result = await User.create({
    name,
    email,
    password: hashPassword,
    verificationToken,
  });

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = register;
