const mongoose = require("mongoose");
/* Category  adde here in schema */
const specificationSchema = new mongoose.Schema(
    {
        name:  {type: String,trim: true,required: true, maxlength: 32},
        code:  {type: String,trim: true,required: true, maxlength: 20,uppercase: true,collation: {locale: 'en',strength: 2 }},
        description:  {type: String},
        type:  {type: String,required: true, enum: ['text', 'attribute'],default: 'text' },
        specificationGroup: {type:String},
        attributeCode: {type:String},
        isDeleted :{require : true,type : Boolean,default: false},
        status: {type: Boolean,default: true,require : true }
        
    },
    { timestamps: true }
);

specificationSchema.index(
    { code: 1 }, 
    { unique: true,  partialFilterExpression: { 'isDeleted': { $exists: true, $eq: false } }
  });

module.exports = mongoose.model("Specification", specificationSchema);
