const crypto = require('crypto');
const algorithm = 'aes-192-cbc';
const key = crypto.scryptSync('zhe800', 'salt', 24);
const iv = Buffer.alloc(16, 0);

let encryptToken = ({mobile = ''} = {}) => {
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let token = `${mobile}|${String(Date.now() + 3 * 60 * 1000)}`;
    let encryptedToken = cipher.update(token, 'utf8', 'hex');
    encryptedToken += cipher.final('hex');
    return encryptedToken;
};

let decryptToken = ({token = ''} = {}) => {
    if (token.length !== 64) {
        return {mobile: '', timestamp: 0}
    }
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(token, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    let [mobile, timestamp] = decrypted.split('|');
    return {mobile, timestamp};
};

//3分钟超时时间
let judgeToken = ({token = ''} = {}) => {
    if (token.length !== 64) {
        return false;
    }
    let {timestamp} = decryptToken({token});
    return Boolean(Math.max(0, timestamp - Date.now()));
};

let updateToken = ({token = ''} = {}) => {
    if (token.length !== 64) {
        return '';
    }
    let {mobile} = decryptToken({token});
    return encryptToken({mobile});
};

module.exports = {
    encryptToken,
    decryptToken,
    judgeToken,
    updateToken
};
