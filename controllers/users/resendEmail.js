const { User } = require('../../models/user');

const { RequestError } = require('../../helpers');

const resendEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404, 'User not found');
  }

  res.json({
    message: 'Verification email sent',
  });
};

module.exports = resendEmail;
