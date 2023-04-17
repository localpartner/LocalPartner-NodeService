const UserSchema = require("../models/user");
const UserDetailsSchema = require("../models/userDetails");
const mongoose = require("mongoose"); 
const AuthUtils = require("./../utils/authUtils")





  

  
  const findUsers = async (storeId, activeFlag) =>{
    let matchObj = {
      "details.storeId": storeId,          
      "isDeleted": false
     
    };
    if(activeFlag ==true){
      matchObj = {
        "details.storeId": storeId,          
        "isDeleted": false,
        "active": true
      };

    }
    let userList =  await  UserSchema.aggregate([
      {
        $lookup: {
          from: "userdetails",
          localField: "details",
          foreignField: "_id",
          as: "details"
        }
      },
      {
        $match: matchObj
      }
    ]);

    return userList.map((user)=>{
     
      let obj = Object.assign({},user);
      obj.details = obj.details[0]
      delete obj.password;
      return obj;
    })
  }

  const findUser = async (storeId,userId, activeFlag) =>{
    let matchObj = {
      "details.storeId": storeId,          
      "isDeleted": false,
      "_id":userId
     
    };
    if(activeFlag ==true){
      matchObj = {
        "details.storeId": storeId,          
        "isDeleted": false,
        "active": true,
        "_id":userId
      };

    }
    let userList =  await  UserSchema.aggregate([
      {
        $lookup: {
          from: "userdetails",
          localField: "details",
          foreignField: "_id",
          as: "details"
        }
      },
      {
        $match: matchObj
      }
    ]);

    let returnList =  userList.map((user)=>{
     
      let obj = Object.assign({},user);
      obj.details = obj.details[0];
      delete obj.password;
      return obj;
    })
    if(returnList && returnList.length>0){
      return returnList[0]
    }else{
      return {};
    }
  }

  exports.getUserList =  async (storeId)=>{
    let objId = mongoose.Types.ObjectId(storeId);    
    return await findUsers(objId,false)
    
  }

  exports.getActiveUserList =  async (storeId)=>{
    let objId = mongoose.Types.ObjectId(storeId);    
    return await findUsers(objId,true)
    
  }


  exports.getUserById =  async (storeId,userId)=>{
    let objId = mongoose.Types.ObjectId(storeId);    
    let id = mongoose.Types.ObjectId(userId);    
    return await findUser(objId,id,false)
  }

  exports.getActiveUserById =  async (storeId,userId)=>{
    let objId = mongoose.Types.ObjectId(storeId);    
    let id = mongoose.Types.ObjectId(userId);    
    return await findUser(objId,id,true)
  }

  exports.createUser = async (userDto)=>{

    const userDetailsSchema = new UserDetailsSchema({
      firstName : userDto.firstName,
      lastName : userDto.lastName,
      role: userDto.roleId,
      storeId:userDto.storeId,
      mobile: userDto.mobile    
    })

   
      userDetails = await userDetailsSchema.save();
      console.log(userDetails)
      const userSchema = new UserSchema({
        email : userDto.email,
        password : userDto.password,
        details: mongoose.Types.ObjectId(userDetails._id),
        type:"STORE_USER"
       
      });
      return await userSchema.save();

  }

  exports.updateUser = async (userDto)=>{

    
    const userDetails = {
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        role: userDto.roleId,
        mobile: userDto.mobile      
      };
     
      // const details = await saveUserDetails(userDetails);
      // const user = await saveUser(userDto.email,userDto.password,details._id);
      // const filter = {_id: mongoose.Types.ObjectId(userDto.userId),'details.storeId':userDto.storeId}
      let hashPwd = await AuthUtils.hashPwd(userDto.password)
      let user = await UserSchema.findByIdAndUpdate(userDto.userId, {'password' : hashPwd}, {new: true});
      console.log(user)
      await UserDetailsSchema.findByIdAndUpdate(user.details, userDetails, {new: true});
      return true;
      

  }

  exports.deleteUser = async (userDto)=>{    
    let updateObj = {isDeleted:true}
     return await UserSchema.findByIdAndUpdate(userDto.userId,updateObj);         

  }
  exports.updateUserStatus = async (userDto)=>{    
    let updateObj = {active:userDto.active}
     return await UserSchema.findByIdAndUpdate(userDto.userId,updateObj);         

  }

  

