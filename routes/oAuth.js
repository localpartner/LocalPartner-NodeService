const express = require("express");
const router = express.Router();
const OAuth2Server = require('oauth2-server');
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

const oAuhServer = new OAuth2Server({
    model: require('./../models/oauth2/oauthModel.js'),
    accessTokenLifetime: 60 * 60,
    allowBearerTokensInQueryString: false
});

const oAuhUserServer = new OAuth2Server({
    model: require('./../models/oauth2/oauthUserModel.js'),
    accessTokenLifetime: 60 * 60,
    allowBearerTokensInQueryString: false
});


const obtainToken = (req, res) => {
    
    var request = new Request(req);
    var response = new Response(res);
  

    let portalType = request.get('X-Portal');
    if(portalType==="user"){
        return oAuhUserServer.token(request, response)
        .then(function(token) {
            res.json(token);
        }).catch(function(err) {
            res.status(err.code || 500).json(err);
        });

    }else{
        return oAuhServer.token(request, response)
        .then(function(token) {
            res.json(token);
        }).catch(function(err) {
            res.status(err.code || 500).json(err);
        });
    }

    
}



router.post("/token", obtainToken);

module.exports = router;