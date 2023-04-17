exports.isBlank = (str)=>{
    if(str==undefined || str==null || str.trim().length==0)
        return true;
    else 
        return false;

}

