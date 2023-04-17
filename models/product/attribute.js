const mongoose = require("mongoose");
/* Attribute   adde here in schema  ../Mangesh/..*/
const attributeSchema = new mongoose.Schema(
    {
        name: {unique : true,require : true,type : String, collation: {locale: 'en',strength: 2 }},
        description: {type: String},
        value: {type: Array, require: true },         
        isDeleted :{require : true,type : Boolean,default: false},
        status: {type: Boolean,default: true,require : true }

    },
    { timestamps: true }
    
);


module.exports = mongoose.model("Attribute", attributeSchema);
