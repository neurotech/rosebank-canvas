var config = {};

config.s3 = {
  bucket: process.env.ROSEBANK_CANVAS_BUCKET,
  accessKeyId: process.env.ROSEBANK_CANVAS_ACCESSKEYID,
  secretAccessKey: process.env.ROSEBANK_CANVAS_SECRETACCESSKEY
};

module.exports = config;
