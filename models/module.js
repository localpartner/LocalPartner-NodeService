const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
    {
        route :{
            type : String,
            required : true
        }
    }
);
module.exports = mongoose.model("Module",moduleSchema)