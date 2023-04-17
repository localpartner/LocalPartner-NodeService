const mongoose = require('mongoose');
const clientModel = require('./client');
const tokenModel = require('./token');
const userModel = require('./../customer/otpVerification');
const Customer = require("./../customer/customer");



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

var saveToken = function(token, client, user, callback) {

	token.client = {
		id: client.clientId
	};
	
	token.user = {
		mobile: user.mobile,
		firstName: user.firstName,
		lastName: user.lastName,
		_id: user._id.toString(),
		roles: user.roles
	};
	

	var tokenInstance = new tokenModel(token);
	tokenInstance.save((function(callback, err, token) {

		if (!token) {
			console.error('Token not saved');
		} else {
			token = token.toObject();
			delete token._id;
			delete token.__v;
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
	
	const user1 = await userModel.findOne({mobileNo: username,otp: password}).lean();
	
	
	if (!user1) {
		console.error('User not found');
		callback(null,undefined)		
	}else{
		const userProfile =  await Customer.findOne({ mobile: username }).lean();
		callback(null,userProfile)
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
