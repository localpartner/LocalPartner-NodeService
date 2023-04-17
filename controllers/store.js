const { json } = require("body-parser");

const StoreSchema = require("../models/store/store");
const UserRoleinSchema = require("../models/userRole");
const UserSchema = require("../models/user");
const UserDetailsSchema = require("../models/userDetails");
const AccessModuleSchema = require("../models/accessModule");
const RolesSchema = require("../models/roles");
const AuthUtils = require("../utils/authUtils")
const mongoose = require("mongoose");
const skipColumns = ['-__v']
const UserService = require("../services/userService")
// Get moongose error

const errorFormat = (e) => {
  const errors = {};
  allError = e.substring(e.indexOf(":") + 1).trim();
  allErrorInArrayFormat = allError.split(",").map((e) => e.trim());
  allErrorInArrayFormat.forEach((error) => {
    const [key, value] = error.split(":").map((err) => err.trim());
    errors[key] = value;
  });
  return errors;
};

/*exports.storeSignin = async (req, res) => {
  // find the store based on email
  try {
      const{email , password} = req.body;
      if(!email || !password){
      return res.status(400).json({error:"please fill the data"})
      }
      const storeLogin = await user.findOne({email:email ,password:password});
      if(!storeLogin){
          res.status(400).json("invalid credentials");
      } else{
          res.json("login successfully");
      }
  }catch(err){
      console.log(err)
  }
};*/

const saveStore = async (storeName,address)=>{

  let storeDetails = new StoreSchema({
    storeName: storeName,
    address: address
  });
  return await storeDetails.save();
}

const createStoreOwnerRole =  async (storedId)=>  {
  const rolesSchema = new RolesSchema({
    roleName : "Store Owner",
    storeId: storedId,
    accessModuleId: ["users","store","reports"]

  })

  return await rolesSchema.save();

}

const createUserDetails =  async (userDetails)=>  {
  const userDetailsSchema = new UserDetailsSchema({
    firstName : userDetails.firstName,
    lastName : userDetails.lastName,
    role: userDetails.role,
    storeId:userDetails.storeId,
    mobile: userDetails.mobile    
  })
  return await userDetailsSchema.save();

}

const createUser =  async (email,password,detailId)=>  {
  const userSchema = new UserSchema({
    email : email,
    password : password,
    details: detailId,
    type:"STORE_USER"
   
  })
  return await userSchema.save();

}


exports.addStoreData = async (req, res) => {
  if (!req.body.storeId) {
    try {
            const { storeName, firstName,lastName, email, password, address, mobile } =   req.body;
            const store = await saveStore(storeName,address);
            const storeId = store._id;
            const storeOwnerRole = await createStoreOwnerRole(store._id);
            const roleId = storeOwnerRole._id;
            const userDetails = {
              firstName: firstName,
              lastName: lastName,
              role: roleId,
              mobile: mobile,        
              storeId: storeId,
              email:email,
              password: password
            };
            const user =  UserService.createUser(userDetails);
            //const details = await createUserDetails(userDetails);
            //const user = await createUser(email,password,details._id);

      return res.status(200).json({
        status: true,
        message: "Store added Successfully",
      });
    } catch (e) {
      return res.status(500).json({
        errors: errorFormat(e.message),
        status: false,
        message: "Something went wrong.....",
      });
    }
  } 
};

exports.updateStoreData = async (req, res) => {
  
    try {
      const {storeName,  address } = req.body;
      const { storeId } = req.params;
      var storeDetails = {
        "storeName": storeName,
        "address": address
      };

      const filter = { _id: storeId };
      const result_ = await StoreSchema.findOneAndUpdate(filter, storeDetails, {
        new: true,
      });

      return res.json({
        status: true,
        message: "Store updated Successfully",
        result: result_,
      });
    } catch (e) {
      return res.status(500).json({
        errors: errorFormat(e.message),
        status: false,
        message: "Something went wrong for update",
      });
    }
  
};
// save store Api

exports.storeList = async (req, res) => {
    let storeList = [];
    
    if(AuthUtils.isAdminUser(res)){
      storeList = await StoreSchema.find({isDelete:false}).select(skipColumns).lean();

    }else if(AuthUtils.isStoreUser(res)){
      const storeId = AuthUtils.getStoreId(res)
      if(storeId){
        storeList = await StoreSchema.find({status:true,isDelete:false,_id:storeId}).select(skipColumns).lean();
      }else{
        return res.status(404).json({
          error: "store not found"
        });
      }
    }
    return res.json({
      status: true,
      result: storeList,
    });
};

exports.getStoreDataById = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const result = await StoreSchema.findOne({ _id: storeId });    
    return res.json(result);
  } catch (e) {
    return res.status(500).json({
      error: "store not found" + e,
    });
  }
};

exports.deleteStoreData = async (req, res) => {
  try {
    var storeDetails = {
      isDelete: true,
    };
    const filter = { _id: req.params.storeId };
    const result_ = await StoreSchema.findOneAndUpdate(filter, storeDetails);
    console.log(result_, "result_");
    return res.json({
      status: true,
      message: "Store deleted Successfully",
      result: result_,
    });
  } catch (e) {
    return res.status(500).json({
      error: "store not found" + e,
    });
  }
};

exports.updateStatus = async (req, res) => {
  console.log("status................",req.params.storeId)
  try{
    var updateData = {
      status : req.body.status
    };
    const filter = { _id : req.params.storeId };
    const result_ = await StoreSchema.findOneAndUpdate(
      filter,
      updateData
      );
      console.log(result_);
      return res.json({
        status: true,
        message: "Status Updated successfully",
        result: result_,
      });
    }catch(e){
      console.log(e);
    }
    };

// exports.addUserRole = async (req, res) => {
//   if (!req.body.userRoleId) {
//     try {
//       console.log(req.body);
//       const userId = mongoose.Types.ObjectId(req.body.assingTo.value);
//       const storeId = mongoose.Types.ObjectId(req.body.storeId);
//       const { roleName, accessModuleId } = req.body;
//       var addUserRole = new UserRoleinSchema({
//         roleName: roleName,
//         accessModuleId: accessModuleId,
//         user_id: userId,
//         storeId: storeId,
//         status: true,
//       });
//       const result_ = await addUserRole.save();
//       return res.json({
//         status: true,
//         message: "Role added Successfully",
//         result: result_,
//       });
//     } catch (e) {
//       return res.json({
//         errors: errorFormat(e.message),
//         status: false,
//         message: "Something went wrong",
//       });
//     }
//   } else {
//     try {
//       const userId = mongoose.Types.ObjectId(req.body.assingTo.value);
//       const { roleName, accessModuleId, userRoleId } = req.body;
//       var addUserRole = {
//         roleName: roleName,
//         accessModuleId: accessModuleId,
//         user_id: userId,
//       };
//       const filter = { _id: userRoleId };
//       const result_ = await UserRoleinSchema.findOneAndUpdate(
//         filter,
//         addUserRole,
//         { new: true, runValidators: true }
//       );
//       return res.json({
//         status: true,
//         message: "User role updated Successfully",
//         result: result_,
//       });
//     } catch (e) {
//       return res.json({
//         errors: errorFormat(e.message),
//         status: false,
//         message: "Something went wrong for update",
//       });
//     }
//   }
// };

// exports.getUserRoleListData = async (req, res) => {
//   try {
//     const storeId = req.params.storeId;
//     let matchObj = {};
//     matchObj["storeId"] = mongoose.Types.ObjectId(storeId);
//     await UserRoleinSchema.aggregate([
//       {
//         $match: {
//           ...matchObj,
//           isDelete: false,
//         },
//       },
//       {
//         $lookup: {
//           from: UserSchema.collection.name,
//           localField: "user_id",
//           foreignField: "_id",
//           as: "user",
//         },
//       },
//       {
//         $lookup: {
//           from: AccessModuleSchema.collection.name,
//           localField: "accessModuleId",
//           foreignField: "name",
//           as: "accessModule",
//         },
//       },
//       {
//         $unwind: "$user",
//       },
//       {
//         $project: {
//           "user.name": 1,
//           "accessModule.label": 1,
//           roleName: 1,
//           accessModuleId: 1,
//           createdDate: 1,
//           status: 1,
//           _id: 1,
//           user_id: 1,
//         },
//       },
//     ]).exec((err, data) => {
//       if (err) {
//         return res.status(400).json({
//           error: "store not found" + err,
//         });
//       }
//       if (data) {
//         return res.json({
//           status: true,
//           result: data,
//         });
//       }
//     });
//   } catch (err) {
//     return res.status(400).json({
//       error: "store not found" + err,
//     });
//   }
// };

// exports.getUserRoleByIdData = async (req, res) => {
//   try {
//     const roleId = mongoose.Types.ObjectId(req.params.roleId);
//     const checkResult =  await UserRoleinSchema.aggregate([
//       {
//         $match : {
//           _id : roleId
//         }
//       },
//      {
//         $lookup: {
//         from : UserSchema.collection.name,
//         localField : "user_id",
//         foreignField : "_id",
//         as: "user"
//       },
      
//     },
//     {
//       $lookup:{
//         from : AccessModuleSchema.collection.name,
//         localField : 'accessModuleId',
//         foreignField: "name",
//         as :"module"
//       }
//     },
//     {
//       $project:{
//         _id : 1,
//         roleName : 1,
//         accessModuleId : 1,
//         'user.name' : 1,
//         'user._id' : 1,
//         'module._id' :1,
//         'module.name' : 1 ,
//         'module.label' : 1 ,
//       }
//     }
//     ]);
//     return res.json(checkResult[0]);
//   } catch (e) {
//     return res.status(400).json({
//       error: "store not found" + e,
//     });
//   }
// };

// exports.deleteUserRole = async (req, res) => {
//   try {
//     var userRoleDetails = {
//       isDelete: true,
//     };
//     const filter = { _id: req.params.userRoleId };
//     const result_ = await UserRoleinSchema.findOneAndUpdate(
//       filter,
//       userRoleDetails
//     );
//     return res.json({
//       status: true,
//       message: "User Role deleted Successfully",
//       result: result_,
//     });
//   } catch (e) {
//     return res.status(400).json({
//       error: "User Role not found" + e,
//     });
//   }
// };

// exports.storeUserList = async (req, res) => {
//   try {
//     let matchObj = {};
//     const storeId = req.params.storeId;
//     matchObj["storeId"] = mongoose.Types.ObjectId(storeId);
//     const result = await UserSchema.aggregate([
//       {
//         $lookup: {
//           from: UserRoleinSchema.collection.name,
//           localField: "_id",
//           foreignField: "user_id",
//           as: "userRole",
//         },
//       },
//       {
//         $match: {
//           $and: [
//             { ...matchObj },
//             { isDelete: false },
//             { role: { $nin: [1, 2, 3, 4] } },
//             // {'userRole.isDelete' : true}
//           ],
//         },
//       },
//       {
//         $project: {
//           _id: "$_id",
//           name: "$name",
//         },
//       },
//     ]);
//     return res.json(result);
//   } catch (e) {
//     return res.status(400).json({
//       error: "User Role not found" + e,
//     });
//   }
// };


    
    // exports.changeStatus =async (req, res) => {
    //   try{
    //     var updateData = {
    //       status : true
    //     };
    //     const filter = { _id : req.params.storeId };
    //     const result_ = await StoreSchema.findOneAndUpdate(
    //       filter,
    //       updateData
    //       );
    //       console.log(result_);
    //       return res.json({
    //         status: true,
    //         message: "Status Updated successfully",
    //         result: result_,
    //       });
    //     }catch(e){
    //       console.log(e);
    //     }
//};
