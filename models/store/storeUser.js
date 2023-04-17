const mongoose = require('mongoose');
const storeSchema =  require('./store');
const { Schema } = mongoose;

const storeUserSchema = new mongoose.Schema(
    {

        email: {
            type: String,
            require : true,
            unique : true
        },
        password:{
            type: String,
            require : true
        },
        status: {
            type: Number,
            default: 1
        },
        role: {
            type: Number,
            default: 3
        },
        date_added: {
            type: Date,
        },
        date_modified: {
            type: Date,
        },
        name:{
            type:String,
        },
        address:{
            type:String,
        },
        userId:{
            type: Schema.Types.ObjectId,
        },
        mobile:{
            type:String
        },
        isDelete :{
            required : false,
            type : Boolean,
            default : 0,
            ref : "1 is deleted & 0 is not deleted",
        },
        deletedAt: {
            type: Date,
        },
        storeId: {
            type: Schema.Types.ObjectId,
            ref: "Store"
        }
    },
    { timestamps: true },
    { collection: 'users' }
);

module.exports = mongoose.model('user', storeUserSchema);
