
const mongoose = require("mongoose");


const accessModule = new mongoose.Schema(
    {
        name: String,
        label: String,
        created_date: {
            type: Date,
            default: Date.now
        }
    }
);


module.exports = mongoose.model("AccessModuleMaster" ,accessModule);
