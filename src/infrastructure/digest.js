import Crypto from 'crypto';

export default (apiKey, time) => {
  const sha = Crypto.createHash('sha256');
  sha.update(time + apiKey);
  return sha.digest('hex');
};
