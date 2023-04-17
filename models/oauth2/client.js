const mongoose = require('mongoose');

const schemaInstance = new mongoose.Schema(
	{
		id: String,
		clientId: String,
		clientSecret: String,
		grants: [String],
		redirectUris: [String]
	}
);
module.exports = mongoose.model("oauthclients", schemaInstance);


