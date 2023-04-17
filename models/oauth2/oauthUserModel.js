const mongoose = require('mongoose');
const clientModel = require('./client');
const tokenModel = require('./token');
const userModel = require('../user');
const Customer = require("../customer/customer");
const RolesSchema =  require("../roles");



/*
 * Methods used by all grant types.
 */

var getAccessToken = function(token, callback) {

	tokenModel.findOne({
		accessToken: token
	}).lean().exec((function(callback, err, token) {

		if (!token) {
			console.error('Token not found');
		}

		callback(err, token);
	}).bind(null, callback));
};

var getClient = function(clientId, clientSecret, callback) {

	clientModel.findOne({
		clientId: clientId,
		clientSecret: clientSecret
	}).lean().exec((function(callback, err, client) {

		if (!client) {
			console.error('Client not found');
		}

		callback(err, client);
	}).bind(null, callback));
};

const saveToken = async (token, client, user, callback) => {

	let accessModules = [];
	let storeId = undefined;
	if(user && user.type == "STORE_USER"){
		const role = await RolesSchema.findOne({active:true,isDeleted:false});
		accessModules = role.accessModuleId;
		storeId = user.details.storeId;
	}

	token.client = {
		id: client.clientId
	};
	
	token.user = {
		
		_id: user._id.toString(),
		email:user.email,
		type: user.type,
		firstName: user.details.firstName,
		lastName: user.details.lastName,
		accessModules:accessModules,
		storeId:storeId
				
	};


	var tokenInstance = new tokenModel(token);
	tokenInstance.save((function(callback, err, token) {

		if (!token) {
			console.error('Token not saved');
		} else {
			token = token.toObject();
			delete token._id;
			delete token.__v;
			delete token.accessModules
			delete token.storeId
		}

		callback(err, token);
	}).bind(null, callback));
};

/*
 * Method used only by password grant type.
 */


const getUserDetails = (callback, err, user)=>{
	if (!user) {
		console.error('User not found');
	}
	
	Customer.findOne({ mobile: user.mobileNo }).lean().exec((function(callback, err, userProfile) {

		if (!userProfile) {
			console.error('userProfile not found');
		}

		callback(err, userProfile);
	}).bind(null, callback));;

	
	
}

const getUser = async(username, password, callback) =>{


	try {
        
        if(!username || !password){
			callback(null,undefined)
        }
		
        const userLogin = await userModel.findOne({email:username,active:true}).populate('details');
		
		
		if(userLogin){
			userLogin.comparePassword(password, function(err, isMatch) {
				if(!isMatch){
					callback(null,undefined)
				}else{
	
					callback(null,userLogin)
				}
			});
		}else{
			callback(null,undefined)
		}
        
        
    }catch(err){
        console.log(err)
    }
};



/*
 * Method used only by client_credentials grant type.
 */

var getUserFromClient = function(client, callback) {

	clientModel.findOne({
		clientId: client.clientId,
		clientSecret: client.clientSecret,
		grants: 'client_credentials'
	}).lean().exec((function(callback, err, client) {

		if (!client) {
			console.error('Client not found');
		}

		callback(err, {
			username: ''
		});
	}).bind(null, callback));
};

/*
 * Methods used only by refresh_token grant type.
 */

var getRefreshToken = function(refreshToken, callback) {

	tokenModel.findOne({
		refreshToken: refreshToken
	}).lean().exec((function(callback, err, token) {

		if (!token) {
			console.error('Token not found');
		}

		callback(err, token);
	}).bind(null, callback));
};

var revokeToken = function(token, callback) {

	tokenModel.deleteOne({
		refreshToken: token.refreshToken
	}).exec((function(callback, err, results) {

		var deleteSuccess = results && results.deletedCount === 1;

		if (!deleteSuccess) {
			console.error('Token not deleted');
		}

		callback(err, deleteSuccess);
	}).bind(null, callback));
};

/**
 * Export model definition object.
 */

module.exports = {
	getAccessToken: getAccessToken,
	getClient: getClient,
	saveToken: saveToken,
	getUser: getUser,
	getUserFromClient: getUserFromClient,
	getRefreshToken: getRefreshToken,
	revokeToken: revokeToken
};
