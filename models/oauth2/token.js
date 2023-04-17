
const mongoose = require('mongoose');

const schemaInstance = new mongoose.Schema(
	{
		accessToken: String,
		accessTokenExpiresAt: Date,
		refreshToken: String,
		refreshTokenExpiresAt: Date,
		client: Object,
		user: Object,
		scope: String
	}
);
module.exports = mongoose.model("oauthtoken", schemaInstance);