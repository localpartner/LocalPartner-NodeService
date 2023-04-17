// const Store = require('../models/store/store');
const { errorHandler } = require('../helpers/dbErrorHandler');
const Users = require("../models/user");
const UserService =  require("../services/userService");
const StringUtils = require('../utils/stringUtils');

exports.userById = (req, res, next, id) => {
    Users.findById(id).populate('storeId').exec((err, user) => {
   // Store.findById(id).exec((err, user) => {
           if (err || !user) {
               return res.status(400).json({
                   error: 'user not found'
               });
           }
           req.user = user;
           next();
       });
};

/* insert into db table here  */
exports.create = async (req, res) => {
   
   try{
        const {storeId} = req.params;
        let user= Object.assign({},req.body,{storeId:storeId });

        await UserService.createUser(user);
        return res.status(200).json({
            status: true,
            message: "User created successfully",
        });
   }catch(e){
        return res.status(500).json({
            errors: e.message,
            status: false,
            message: "Something went wrong.....",
        });
   }
};


exports.read = (req, res) => {
   return res.json(req.user);
};

exports.update = async (req, res) => {

    try {
        const { storeId, userId } = req.params;
        let user = Object.assign({}, req.body, { storeId: storeId, userId: userId });

        await UserService.updateUser(user);
        return res.status(200).json({
            status: true,
            message: "User updated successfully",
        });
    } catch (e) {
        return res.status(500).json({
            errors: e.message,
            status: false,
            message: "Something went wrong.....",
        });
    }
};
exports.remove = async(req, res) => {

    try {
        const { storeId, userId } = req.params;
        let user = Object.assign({}, req.body, { storeId: storeId, userId: userId });

        await UserService.deleteUser(user);
        return res.status(200).json({
            status: true,
            message: "User deleted successfully",
        });
    } catch (e) {
        return res.status(500).json({
            errors: e.message,
            status: false,
            message: "Something went wrong.....",
        });
    }
};
// exports.update = async (req , res) =>{

//     try{
//         const {storeId,userId} = req.params;
//         const {roleName,accessModules} = req.body;
        

//         if(validateRoleSchema({roleName,storeId,accessModules}) && !StringUtils.isBlank(roleId)){
//             let updateObj = {roleName,storeId,accessModuleId:accessModules}
//             const result = await RolesSchema.findByIdAndUpdate(roleId,updateObj);           
//             console.log(result);    
//             return res.status(200).json({
//                 message: "Role updated successfully.",
//             });
    
//         }else{
//             return res. status(400).json({
//                 message: "Invalid Request",
//             });
//         }
       
//     }catch(error){      
//         return res. status(500).json({
//             errors: e.message,
//             status: false,
//             message: "Something went wrong.....",
//           });
//     }
    
// }

exports.updateStatus = async(req, res) => {
    try {
        const { storeId, userId } = req.params;
        let user = Object.assign({}, req.body, { storeId: storeId, userId: userId });

        await UserService.updateUserStatus(user);
        return res.status(200).json({
            status: true,
            message: "User status updated successfully",
        });
    } catch (e) {
        return res.status(500).json({
            errors: e.message,
            status: false,
            message: "Something went wrong.....",
        });
    }
};

exports.changeStatus = async(req, res) => {
    const user = req.user;
    user.status = req.body.name;
    user.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.updateDelete = async(req, res) => {
   const user = req.user;
   user.deletedAt = req.body.manufacturerName;
   user.save((err, data) => {
       if (err) {
           return res.status(400).json({
               error: errorHandler(err)
           });
       }
       res.json(data);
   });
};


// exports.remove = async(req, res) => {
//    let user = req.user;
//    user.remove((err, deleted) => {
//        if (err) {
//            return res.status(400).json({
//                error: errorHandler(err)
//            });
//        }
//        res.json({
//            message: 'Delet Manifactuer table'
//        });
//    });
// };

// exports.list = (req, res) => {
       
//     let order = req.query.order ? req.query.order : 'asc';
//     let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
                
    
//     Users.find().sort([[sortBy, order]]).populate('storeId').exec((err, user) => {
//             if (err) {
//                 return res.status(400).json({
//                     error: 'user not found'
//                 });
//             }
//             res.json(user);
     
//         });
//  };
 exports.list =async (req , res) =>{

    try{
        const {storeId} = req.params;
        if(!StringUtils.isBlank(storeId)){
            
            const result = await UserService.getUserList(storeId);        
            console.log(result);    
            return res.status(200).json({
                status: true,
                data: result
            });
    
        }else{
            return res. status(400).json({
                message: "Invalid Request",
            });
        }
       
    }catch(e){      
        return res. status(500).json({
            errors: e.message,
            status: false,
            message: "Something went wrong.....",
          });
    }
    
}

exports.read = async (req , res) =>{

    try{
        const {storeId,userId} = req.params;
        if(!StringUtils.isBlank(storeId) && !StringUtils.isBlank(userId)){
            
            const result = await UserService.getUserById(storeId,userId);        
            console.log(result);    
            return res.status(200).json({
                status: true,
                data: result
            });
    
        }else{
            return res. status(400).json({
                message: "Invalid Request",
            });
        }
       
    }catch(e){      
        return res. status(500).json({
            errors: e.message,
            status: false,
            message: "Something went wrong.....",
          });
    }
    
}



