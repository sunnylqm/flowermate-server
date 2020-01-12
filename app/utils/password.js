const sha256 = require('crypto-js/sha256');
const jwt = require('jsonwebtoken');
const siteConfig = require('../../config/site');

const SECRET = process.env.NODE_ENV === 'production' ? siteConfig.prodSecret : siteConfig.debugSecret;

function passwordWithSalt(pwd) {
  return sha256(SECRET + pwd).toString();
}

function parseToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (e) {
    return null;
  }
}

function createToken(payload) {
  return jwt.sign(payload, SECRET);
}

module.exports = {
  passwordWithSalt,
  createToken,
  parseToken,
};
