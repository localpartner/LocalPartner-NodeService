const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const isAdminUser = (res) =>{
    let adminUser =false;
    try{
        if(res.locals.auth.user.type==="ADMIN"){
            adminUser =true;
        }
    }catch(error){

    }
    return adminUser;

}

const isStoreUser = (res) =>{
    let storeUser =false;
    try{
        if(res.locals.auth.user.type==="STORE_USER"){
            storeUser =true;
        }
    }catch(error){

    }
    return storeUser;
}

const isCustomer = (res) =>{
    let customer =false;
    try{
        if(res.locals.auth.user.type!=="STORE_USER",res.locals.auth.user.type!=="ADMIN"){
            customer =true;
        }
    }catch(error){

    }
    return customer;
}
const getStoreId = (res) =>{
    let storeId = undefined;
    
    try{
        if(isStoreUser(res)){
            storeId = res.locals.auth.user.storeId;
        }
    }catch(error){

    }
    return storeId;

}

const checkPermission = (moduleName)=>{

    return (req, res, next,moduleName) => {
        console.log(moduleName)
        if(isAdminUser(res)){
            next();
    
        }else if(isStoreUser(res)){
            if(res.locals.auth.user.accessModules && res.locals.auth.user.accessModules.includes(moduleName)){
               next();
            }else{ 
                return res.status(403).json({
                    error: "Access denied",
                  });
            }
        }
    }
}

const isValidStore = (req, res, next) =>{
    if(isAdminUser(res)){
        next();
    }else if  (isStoreUser(res)){
        const userStoreId = res.locals.auth.user.storeId.toString();       
        const {storeId} = req.params;
        if(userStoreId == storeId){
            next();
        }else{
            return res.status(403).json({
                error: "Access denied",
              });
        }
    }
}
const hashPwd = async (plainPwd)=>{
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    return await bcrypt.hash(plainPwd, salt);
   
}

exports.isAdminUser = isAdminUser;
exports.isStoreUser = isStoreUser;
exports.getStoreId = getStoreId;
exports.checkPermission = checkPermission;
exports.isValidStore = isValidStore;
exports.isCustomer = isCustomer;
exports.hashPwd = hashPwd;