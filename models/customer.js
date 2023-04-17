const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        mobile:{
            type: Number
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        image: {
            type: String,
        },
        status: {
            type: Number,
            default: 1
//type: Boolean,
        },
        about: {
            type: String,
            trim: true
        },
        salt: String,
        role_id: {
            type: Number,
            default: 0
        },
        history: {
            type: Array,
            default: []
        },
        date_added: {
            type: Date,
        },
        date_modified: {
            type: Date,
        },
        deletedAt: {
            type: Date,
        }
    },
    { timestamps: true }
);

// virtual field
userSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
};

module.exports = mongoose.model('User', userSchema);
