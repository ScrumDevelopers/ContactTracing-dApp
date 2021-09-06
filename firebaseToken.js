var {google} = require('googleapis');
var MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
var SCOPES = [MESSAGING_SCOPE];

var http = require('http')

function getAccessToken(){
    return new Promise(function(resolve, reject){
        var key = require("./contact-tracing-app-fbadmin.json");
        var jwtClient = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            SCOPES,
            null
        );
        jwtClient.authorize(function(err, tokens){
            if(err){
                reject(err);
                return; 
            }
            resolve(tokens.access_token);
        });
    });
  }

  getAccessToken().then(function(token){
      console.log(token)
  })