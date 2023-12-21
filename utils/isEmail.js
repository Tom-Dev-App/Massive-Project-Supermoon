const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isEmail(email) {
  return emailPattern.test(email);
}

module.exports = isEmail;
