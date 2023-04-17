const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const customerAddressSchema = new mongoose.Schema(
    {
        addressType:{type:String, required: true},
        addressLine1: {type:String, required: true},
        addressLine2: {type:String, required: false},
        city    : {type:String, required: true},
        state   : {type:String, required: true},
        pincode : {type:String, required: true},
        country : {type:String, required: true},
    }, 
    { _id : false }
);

const imageSchema = new mongoose.Schema({
    name: String,
    description: String,
    contentType: String,
    data: String,
}, { _id : false });

const customerSchema = new mongoose.Schema(
    {
        firstname: { type: String, trim: true },
        lastname: { type: String, trim: true },
        mobile:{ type: Number, unique: true },
        email: { type: String, trim: true },
        gender: { type: String, trim: true },
        hashed_password: { type: String, },
        img: { type: imageSchema, required:false},
        status: { type: Number, default: 1 },
        about: { type: String, trim: true },
        addresses:{type: [customerAddressSchema], required:false},
        salt: String,
        role_id: { type: Number, default: 0 },
        history: { type: Array, default: [] },
        isOtpVerified : { type: Boolean, default : false },
        isDeleted : { type : Boolean, default : false },
        status: {type: Boolean, default: true, require: true }
    },
    { timestamps: true }
);
// virtual field
customerSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

customerSchema.methods = {
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

// customerSchema.pre('firstName').validate(
//   async firstName =>{
//       const name = firstName.charAt(0).toUpperCase() + firstName.slice(1);
//       return name;
//   }  
// )


module.exports = mongoose.model("Customer" ,customerSchema);

// customerSchema.path('mobile').validate(
//     async mobile =>{
//         const mobileCount = await mongoose.models.Customer.countDocuments({
//             mobile
//         })
//         return !mobileCount
//     }, 'Mobile already exists');