const mongoose = require("mongoose");
const UserDetails = require("./userDetails");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;




const User = new mongoose.Schema(
    {
        email:{
            type : String,
            require : true,
            lowercase: true, 
            trim: true,
            unique: true
           
        },
        password :{
            type : String,
            require : true
        },
       
        active :{
            type : Boolean,
            require : true,
            default: true
        },
        type :{
            type : String,
            require : true           
        },  
        details:{
            type: Schema.Types.ObjectId,
            ref: "UserDetails"
        },          
        isDeleted :{
            type : Boolean,
            default: false
        }
       
    },
    { timestamps: true }
);
User.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
User.pre('updateOne', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
User.pre('findOne', function() {
    console.log(this._conditions)
    if (this._conditions.email) {
        this._conditions.email = this._conditions.email.toLowerCase();
    }
});


     
User.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model("Users" ,User)