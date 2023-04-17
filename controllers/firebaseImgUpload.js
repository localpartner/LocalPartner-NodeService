const { uploadBytesResumable, getDownloadURL } = require("firebase/storage");

const firebase = require("./dbFirebase");
const firestore = firebase.firestore();
const storage = firebase.storage().ref();
global.XMLHttpRequest = require("xhr2");


const uploadImgConfig = async (req, res, location , next) =>{
        const file =  req.file;
        const timestamp = Date.now();
        const name = file.originalname.split('.')[0];
        const type = file.originalname.split('.')[1];
        const fileName = `${name}_${timestamp}.${type}`;
        // Step 1. Create reference for file name in cloud storage
        const imageRef = storage.child(`${location}/${fileName}`);
        // Step 2. Upload the file in the bucket storage

        const snapshot = await imageRef.put(file.buffer);
        // Step 3. Grab the public url
        return req.downloadURL = await snapshot.ref.getDownloadURL();
        next(); 
}

module.exports = uploadImgConfig;

// exports.uploadImgConfig;