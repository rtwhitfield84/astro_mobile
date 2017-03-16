"use strict";
var url = require('url');
var fs = require('fs');
var crypto = require('crypto');
//npm install request
var request = require('request');

// Replace "###...###" below with your project's host, access_key and access_secret.
var defaultOptions = {
  host: 'us-west-2.api.acrcloud.com',
  endpoint: '/v1/identify',
  signature_version: '1',
  data_type:'audio',
  secure: true,
  access_key: '775694bf3b822fa5a6c13f7167050fa6',
  access_secret: 'GLzAgIbaVrviG5PZwMQM4yA7ncgZI75XbXveOEEo'
};

function buildStringToSign(method, uri, accessKey, dataType, signatureVersion, timestamp) {
  return [method, uri, accessKey, dataType, signatureVersion, timestamp].join('\n');
}

function sign(signString, accessSecret) {
  return crypto.createHmac('sha1', accessSecret)
    .update(new Buffer(signString, 'utf-8'))
    .digest().toString('base64');
}

/**
 * Identifies a sample of bytes
 */
function identify(data, options, cb) {

  var current_data = new Date();
  var timestamp = current_data.getTime()/1000;

  var stringToSign = buildStringToSign('POST',
    options.endpoint,
    options.access_key,
    options.data_type,
    options.signature_version,
    timestamp);

  var signature = sign(stringToSign, options.access_secret);

  var formData = {
    sample: data,
    access_key:options.access_key,
    data_type:options.data_type,
    signature_version:options.signature_version,
    signature:signature,
    sample_bytes:data.length,
    timestamp:timestamp,
  };
  request.post({
    url: "http://"+options.host + options.endpoint,
    method: 'POST',
    formData: formData
  }, cb);
}

// var bitmap = fs.readFileSync('sample.wav');
var bitmap = fs.readFileSync('/var/mobile/Containers/Data/Application/*.m4a');

identify(new Buffer(bitmap), defaultOptions, function (err, httpResponse, body) {
  if (err) console.log(err);
  console.log(body);
});

//path
// /var/mobile/Containers/Data/Application/8EF4AFFB-D7FF-40B7-BE44-599B1FF1A3F3/Library/NoCloud/C2A3A0EA-247C-497D-B9F7-1C5E60D8C236.m4a
///
// /var/mobile/Containers/Data/Application/8EF4AFFB-D7FF-40B7-BE44-599B1FF1A3F3/Library/NoCloud/F0A55735-D718-4133-AB35-2BF0837DEF7B.m4a
///
///
///
///
// require('dotenv').load();

// // var express = require( 'express' );
// var bodyParser = require('body-parser');
// // var acr = express();

// var ACRCloud = require( 'acr-cloud' );
// var acr = new ACRCloud({
//     // required
//     access_key: '775694bf3b822fa5a6c13f7167050fa6',
//     access_secret: 'GLzAgIbaVrviG5PZwMQM4yA7ncgZI75XbXveOEEo',
//     // optional
//     requrl: 'us-west-2.api.acrcloud.com',
//     http_method: 'POST',
//     http_uri: '/v1/identify',
//     data_type: 'audio',
//     signature_version: '2',
//     timestamp: Date.now()
// });



// // Enable cross domain
// // acr.use( function( req, res, next ) {
// //   res.header( 'Access-Control-Allow-Origin', '*' );
// //   res.header( 'Access-Control-Allow-Headers', 'X-Requested-With' );
// //   next();
// // });

// // Body parser with bigger body size limit
// // var sizeLimit = process.env.SIZE_LIMIT || '5mb';
// // acr.use( bodyParser.json( ) );
// // acr.use( bodyParser.urlencoded( ) );

// // POST endpoint to receive the base64 audio
// acr.post( '/', function( req, res ) {
//   // Return error if the audio parameter was not sent
//   if( !req.body || !req.body.audio ) {
//     return req.send({
//       success: false,
//       msg: "Must have an audio parameter",
//       data: req.body
//     });
//   }

//   // HTML/JS base64 src audio file
//   // var buffer = req.body.audio.replace(/^data:audio\/wav;base64,/, "");
//   // var buffer = req.body.audio;
//   acr.identify( buffer )
//   .then( function( data ) {
//     var response = JSON.parse( data.body );
//     if( data.statusCode == 200 && response.status ) {
//       var success = ( response.status.msg == 'Success' );
//       return res.send({
//         success: success,
//         msg: response.status.msg,
//         data: response
//       });
//     } else {
//       return res.send({
//         success: false,
//         msg: "Error reaching API",
//         data: data
//       });
//     }
//     res.send({
//       success: true,
//       msg: "Found the audio",
//       data: data
//     });
//     console.log("data", data);
//   })
//   .catch( function( err ) {
//     return res.send({
//       success: false,
//       msg: "Error identifying audio",
//       data: err
//     });
//   });
// });
