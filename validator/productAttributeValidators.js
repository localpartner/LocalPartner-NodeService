const ManufacturerService = require("./../services/manufacturerService");
const CayegoryService = require("./../services/categoryService");
const SpecificationService = require("./../services/specificationService");


exports.isManufacturerPresent = async (name)=>{

    let manufacturer = await ManufacturerService.getManufacturer(name);
    if(manufacturer)
        return true;
    else
        return false;
}

exports.getManufacturerDetails= async (name)=>{

    let manufacturer = await ManufacturerService.getManufacturer(name);
    if(manufacturer)
        return manufacturer;
    else
        return undefined;
}

exports.isCategoryPresent = async (categoryList)=>{

    if(categoryList){
        flag= true;
        for(let i=0;i<categoryList.length;i++){
            let category = categoryList[i];
            let code = category.code;
            let subCode = category.subCode;
            let cat;
            if(subCode){
                cat = await CayegoryService.getCategory(subCode,code);
            }else{
                cat = await CayegoryService.getCategory(code);
            }
            if(!cat)
               flag =false;

        }
       
        return flag;

    }else{
        return true;
    }

   console.log(category);
   return true;
 
}

exports.categoryMessage = (props)=>{
    console.log(props.value)
    console.log(this)
    return "invalid category"

}

exports.isSpecificationPresent = async (name)=>{

    let specification = await SpecificationService.getSpecification(name);
    if(specification)
        return true;
    else
        return false;
}

exports.getSpecificationGroup = async (name)=>{

    let specification = await SpecificationService.getSpecification(name);
    if(specification)
        return specification;
    else
        return undefined;
}

exports.StartEndDateValidator = async (name)=>{

    let specification = await SpecificationService.getSpecification(name);
    if(specification)
        return true;
    else
        return false;
}

