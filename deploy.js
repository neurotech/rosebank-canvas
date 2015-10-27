'use strict';

var http = require('http');
var https = require('https');
var s3 = require('s3');
var chalk = require('chalk');
var config = require('./config');

http.globalAgent.maxSockets = https.globalAgent.maxSockets = 20;

var deployOptions = {
  options: {
    s3Options: {
      accessKeyId: config.s3.accessKeyId,
      secretAccessKey: config.s3.secretAccessKey
    }
  },
  params: {
    localDir: './build',
    deleteRemoved: true,
    s3Params: {
      Bucket: config.s3.bucket,
      ACL: 'public-read'
    },
  }
};

var client = s3.createClient(deployOptions.options);
var uploader = client.uploadDir(deployOptions.params);

uploader.on('error', function(err) {
  console.error('Error - Unable to sync: ', err.stack);
});

uploader.on('end', function() {
  console.log(chalk.white('-------------------------'));
  console.log(chalk.bgYellow.black('[S3]     Upload complete.'));
});