const phoneNumberPattern = /^\d{10,}$/;

function isPhone(phone) {
  return phoneNumberPattern.test(phone);
}

module.exports = isPhone;
