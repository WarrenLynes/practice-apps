const crypto = require('crypto');

module.exports.hash = function hash(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

module.exports.createSession = function createSession() {
  return crypto.randomBytes(32).toString('hex');
}