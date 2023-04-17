const RolesSchema = require('../models/roles');
const StringUtils = require('../utils/stringUtils');
const validateRoleSchema = (rolesSchema)=>{
    if(!rolesSchema || StringUtils.isBlank(rolesSchema.roleName) || 
        StringUtils.isBlank(rolesSchema.storeId)|| rolesSchema.accessModules.length ==0) {
            return false;
        }
    return true;
}

exports.createRole = async (req , res) =>{

    try{
        const {roleName,accessModules} = req.body;
        const {storeId} = req.params;
        const rolesSchema = new RolesSchema({
            roleName : roleName,
            storeId: storeId,
            accessModuleId: accessModules
          });
        if(validateRoleSchema({roleName,storeId,accessModules})){
            const result = rolesSchema.save();
            console.log(result);
            return res. status(200).json({
                message: "Role created successfully.",
            });
        }else{
            return res. status(400).json({
                message: "Invalid Request",
            });
        }

    }catch(error){      
        return res. status(500).json({
            errors: e.message,
            status: false,
            message: "Something went wrong.....",
          });
    }
    
}

exports.updateRole = async (req , res) =>{

    try{
        const {storeId,roleId} = req.params;
        const {roleName,accessModules} = req.body;
        

        if(validateRoleSchema({roleName,storeId,accessModules}) && !StringUtils.isBlank(roleId)){
            let updateObj = {roleName,storeId,accessModuleId:accessModules}
            const result = await RolesSchema.findByIdAndUpdate(roleId,updateObj);           
            console.log(result);    
            return res.status(200).json({
                message: "Role updated successfully.",
            });
    
        }else{
            return res. status(400).json({
                message: "Invalid Request",
            });
        }
       
    }catch(error){      
        return res. status(500).json({
            errors: e.message,
            status: false,
            message: "Something went wrong.....",
          });
    }
    
}

exports.deleteRole = async (req , res) =>{

    try{
        const {storeId,roleId} = req.params;
        const {roleName,accessModules} = req.body;
        

        if(!StringUtils.isBlank(storeId) && !StringUtils.isBlank(roleId)){
            let updateObj = {isDeleted:true}
            const result = await RolesSchema.findByIdAndUpdate(roleId,updateObj);           
            console.log(result);    
            return res.status(200).json({
                message: "Role deleted successfully.",
            });
    
        }else{
            return res. status(400).json({
                message: "Invalid Request",
            });
        }
       
    }catch(error){      
        return res. status(500).json({
            errors: e.message,
            status: false,
            message: "Something went wrong.....",
          });
    }
    
}

exports.getRoleList = async (req , res) =>{

    try{
        const {storeId} = req.params;
        if(!StringUtils.isBlank(storeId)){
            
            const result = await RolesSchema.find({storeId:storeId,isDeleted:false,active:true});           
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
       
    }catch(error){      
        return res. status(500).json({
            errors: e.message,
            status: false,
            message: "Something went wrong.....",
          });
    }
    
}

exports.getRole = async (req , res) =>{

    try{
        const {storeId,roleId} = req.params;
        if(!StringUtils.isBlank(storeId) && !StringUtils.isBlank(roleId)){
            
            const result = await RolesSchema.findOne({storeId:storeId,_id:roleId,isDeleted:false,active:true}).lean();           
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
       
    }catch(error){      
        return res. status(500).json({
            errors: e.message,
            status: false,
            message: "Something went wrong.....",
          });
    }
    
}