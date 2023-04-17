const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    name: String,
    description: String,
    contentType: String,
    data: String,
}, { _id : false });


const manufacturerSchema = new mongoose.Schema({
        name: {unique: true, require: true, type: String, collation: {locale: 'en',strength: 2 }},
        description: {type: String},
        img: {type: imageSchema},
        isDeleted: {require: true, type: Boolean, default: false},
        status: {type: Boolean, default: true, require: true },
    }, { 
        timestamps: true 
});

module.exports = mongoose.model("Image", imageSchema);
module.exports = mongoose.model("Manufacturer", manufacturerSchema);
