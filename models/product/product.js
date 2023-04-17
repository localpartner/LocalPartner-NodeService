const mongoose = require("mongoose");
const { ObjectId  } = mongoose.Schema;

const productValidator = require("./../../validator/productAttributeValidators")
const identificationSchema = new mongoose.Schema({
    
        sku : {type: String},
        upc: {type: String},
        ean: {type: String},
        jan: {type: String},
        isbn: {type: String},
        mpn: {type: String}
    
}, { _id : false });
const stockSchema = new mongoose.Schema({
    
        quantity : {type: Number,default:1,required:true},
        substractStock: {type: Boolean,default:false,required:true},
        dateAvailable: {type: Date,required:true},
        oosMessage: {type: String,default:"Out Of Stock",required:true}               
    
}, { _id : false });
const linkSchema = new mongoose.Schema({
   
        brand : {
                type: String,              
                validate:  {
                                isAsync: true,
                                validator: productValidator.isManufacturerPresent,
                                message: props => `${props.value} is not a valid manufacturer!`
                      }
        },
        category: {
            type:[
                        {
                                code: {type:String},
                                subCode: {type:String},
                               
                        }
                ],
                validate:  {
                        isAsync: true,
                        validator: productValidator.isCategoryPresent,
                        message: props => `Invalid category!`
                }
        },
        relatedProducts: [String]
        
    
}, { _id : false });

const specificationSchema = new mongoose.Schema({
    
            code:{
                        type:String,
                        required:[true,"Specification Code is required"],
                        validate:  {
                                isAsync: true,
                                validator: productValidator.isSpecificationPresent,
                                message: props => `${props.value} is not a valid specification!`
                        }
                },
            value:{
                        type:String,
                        required:[true,"Specification Code is required"]
                }
            
        
}, { _id : false });
const optionSchema = new mongoose.Schema({
    
            type : {type: String, required:[true,"Option type is required"],enum: ['radio', 'dropdown'],default: 'radio'},
            displayName : {type: String, required:[true,"Display name is required"]},
            data: {
                type:[
                        {
                            value: {type:String,required:[true,"Option value is required"]},
                            quantity: {type:Number,required:[true,"Quantity is required"]},
                            substractStock: {type: Boolean,default:false,required:true},
                            dateAvailable: {type: Date,required:[true,"Availability Date is required"]},
                            price: {type: Number, get: v => (v/100).toFixed(2),set: v => v*100,require: true,default:0,required:true}
                        }
                    ]
            }
   
}, { _id : false });

const discountSchema = new mongoose.Schema({
    
            startDate:{type:Date,required:[true,"Start Date is required"]},
            endDate:{type:Date,required:[true,"End Date is required"]},
            quantity:{type:Number,required:[true,"Quantity is required"]},
            discount:{type:Number,required:[true,"Discount is required"]}
            
      
}, { _id : false });
const specialSchema = new mongoose.Schema({
   
        startDate:{type:Date,required:[true,"Start Date is required"]},
        endDate:{type:Date,required:[true,"End Date is required"]},           
        price:{type:Number,required:[true,"Price is required"]}
    
}, { _id : false });
const imageSchema = new mongoose.Schema({
    
        name: String,
        primaryImage: Boolean,
        content: String
    
    
}, { _id : false });

const featuresSchema = new mongoose.Schema({
        title: String,
        description: String,
        data: String
}, { _id : false });

const productSchema = new mongoose.Schema(
    {
        name: {required: true, type: String},
        code: {required: true, type: String, collation: {locale: 'en',strength: 2 }},
        description: {type: String},
        tags: [String],
        price: {type: Number, get: v => (v/100).toFixed(2),set: v => v*100,required: true,default:0},
        location: [Number],
        isRental: {type:Boolean, default:false, required:false},
        identification:{type: identificationSchema, required:false},
        highlights:{type: [String], required:false},
        features:{type: [featuresSchema], required:false},
        stock:{type: stockSchema, required:false},        
        links:{type: linkSchema, required:false}, 
        specifications:{type: [specificationSchema], required:false}, 
        options:{type: [optionSchema], required:false},
        discount: {type: [discountSchema], required:false},
        specials: {type: [specialSchema], required:false},
        images: {type: [imageSchema], required:false}, 
        isDeleted: {require: true, type: Boolean, default: false},
        storeId : { 
            type: mongoose.Types.ObjectId,
            ref: "Store"
        },
        status: {type: Boolean, default: true, require: true }
    },
    { timestamps: true }
);
productSchema.index(
    { code: 1}, 
    { unique: true,  partialFilterExpression: { 'isDeleted': { $exists: true, $eq: false } }
  }); 

productSchema.set('toJSON', { getters: true, setters: true, virtuals: true});
productSchema.set('toObject', { getters: true, setters: true, virtuals: true});

  /**validators */

  


module.exports = mongoose.model("Product", productSchema);

