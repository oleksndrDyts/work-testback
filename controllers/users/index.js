const register = require('./register');
const resendEmail = require('./resendEmail');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  resendEmail,
};
