import crypto from 'crypto';

const id = crypto.randomBytes(10).toString("hex");

export default id;