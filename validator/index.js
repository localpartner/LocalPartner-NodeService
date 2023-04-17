exports.userSignupValidator = (req, res, next) => {
  const errors_data = {};
  req.check("mobile", "Mobile no is required.").notEmpty()
  .isLength({
    min: 10,
    max: 10,
  }).withMessage("Mobile number must be 10 digit.");
  req.check("firstName", "First name is required.").notEmpty()
  .isLength({
    min: 3,
    max: 25
  });
  req.check("lastName", "Last name is required.").notEmpty()
  .isLength({
    min: 3,
    max: 25
  });
    const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(
      (error) => (errors_data[error.param] = error.msg)
    )[0];
    return res.status(400).json({
      errors: errors_data,
      status: false,
      message: "Something went wrong",
    });
  }
  next();
};

exports.userSignupValidator_old = (req, res, next) => {
  req.check("name", "Name is required").notEmpty();
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 32,
    });
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
exports.manuValidator = (req, res, next) => {
    const errors_data = {};
    req.check('name', 'Manufacturer name is required').notEmpty();
   // req.check('description', 'description name is required').notEmpty();
    const errors = req.validationErrors();
    // if (errors) {
    //     const firstError = errors.map(error => error.msg)[0];
    //     return res.status(400).json({ error: firstError });
    // }
    if (errors) {
        const firstError = errors.map((error) =>
        errors_data[error.param] = error.msg
        );
        return res.status(400).json({ 
            errors: errors_data,
            status: false,
            message: "Something went wrong"
        });
    }
    next();
};
//userManagementvalidation
exports.userValidator = (req, res, next) => {
  const errors_data = {};
  req.check("firstName", "First Name is required").notEmpty();
  req.check("lastName", "Last Name is required").notEmpty();
  req.check("roleId", "Role is required").notEmpty();
  req.check("storeId", "Store is required").notEmpty();
 
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 32,
    });
  req.check("password", "Password is required").notEmpty();
  req.check("mobile", "Mobile no must be 10 digit").isLength({
    min: 10,
    max: 10,
  });
  const errors = req.validationErrors();

  if (errors) {
    const firstError = errors.map((error) => 
    errors_data[error.param] = error.msg
    );
    return res.status(400).json({ error: errors_data });
  }
  next();
};

exports.updateUserValidator = (req, res, next) => {
  const errors_data = {};
  req.check("firstName", "First Name is required").notEmpty();
  req.check("lastName", "Last Name is required").notEmpty();
  req.check("roleId", "Role is required").notEmpty();
  req.check("storeId", "Store is required").notEmpty();
 
 
  req.check("password", "Password is required").notEmpty();
  req.check("mobile", "Mobile no must be 10 digit").isLength({
    min: 10,
    max: 10,
  });
  const errors = req.validationErrors();

  if (errors) {
    const firstError = errors.map((error) => 
    errors_data[error.param] = error.msg
    );
    return res.status(400).json({ error: errors_data });
  }
  next();
};

//userManagementvalidation
exports.userUpdateValidator = (req, res, next) => {
  const errors_data = {};
  req.check("name", "Name is required").notEmpty();
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 32,
    });
  // req.check("mobile", "Mobile no must be 10 digit").isLength({
  //   min: 10,
  //   max: 10,
  // });
  const errors = req.validationErrors();

  if (errors) {
    const firstError = errors.map((error) => 
    errors_data[error.param] = error.msg
    );
    return res.status(400).json({ error: errors_data });
  }
  next();
};


exports.attributeValidator = (req, res, next) => {
    const errors_data = {};
    req.check('name', 'Attribute name is required').notEmpty();
    req.check('value', 'Attribute Value is required').notEmpty();
  //  req.check('dimension', 'Attribute Value is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) 
    {
        const firstError = errors.map((error) =>
        errors_data[error.param] = error.msg
        );
        return res.status(400).json({ 
            errors: errors_data,
            status: false,
            message: "Something went wrong"
        });
    }
    next();
};
exports.attributeUpdateValidator = (req, res, next) => {
  const errors_data = {};
  //req.check('name', 'Attribute name is required').notEmpty();
  req.check('value', 'Attribute Value is required').notEmpty();
//  req.check('dimension', 'Attribute Value is required').notEmpty();
  const errors = req.validationErrors();
  if (errors) 
  {
      const firstError = errors.map((error) =>
      errors_data[error.param] = error.msg
      );
      return res.status(400).json({ 
          errors: errors_data,
          status: false,
          message: "Something went wrong"
      });
  }
  next();
};
exports.taxValidator = (req, res, next) => {
  const errors_data = {};
  req.check('taxName', 'Tax name is required').notEmpty();
//  req.check('dimension', 'Attribute Value is required').notEmpty();
  const errors = req.validationErrors();
  if (errors) 
  {
      const firstError = errors.map((error) =>
      errors_data[error.param] = error.msg
      );
      return res.status(400).json({ 
          errors: errors_data,
          status: false,
          message: "Something went wrong"
      });
  }
  next();
};

//shubha : error format

exports.storeValidator = (req, res, next) => {
    const errors_data = {};
    req.check('email', 'Email must be between 3 to 32 characters').matches(/.+\@.+\..+/).withMessage('Email must contain @').isLength({min: 4, max: 32});
    req.check('password','Password is required').notEmpty();
    req.check('storeName','Store name is required').notEmpty();
    req.check('firstName', 'First Name is requied').notEmpty();
    req.check('lastName', 'First Name is requied').notEmpty();
    req.check('address','Address is required').notEmpty();
    req.check('mobile','Mobile no must be 10 digit').isLength({ min: 10, max: 10 });
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map((error) =>
        errors_data[error.param] = error.msg
        );
        return res.status(400).json({ 
            errors: errors_data,
            status: false,
            message: "Something went wrong"
        });
    }
    next();
}

exports.updateStoreValidator = (req, res, next) => {
  const errors_data = {};
  
  req.check('storeName','Store name is required').notEmpty();  
  req.check('address','Address is required').notEmpty();
  
  const errors = req.validationErrors();
  if (errors) {
      const firstError = errors.map((error) =>
      errors_data[error.param] = error.msg
      );
      return res.status(400).json({ 
          errors: errors_data,
          status: false,
          message: "Something went wrong"
      });
  }
  next();
}

exports.userRoleValidator = (req, res, next) =>{
    const errors_data = {};
    req.check('roleName','Role Name is required').notEmpty();
    req.check('accessModuleId','Access Module is required').notEmpty();
    req.check('assingTo','User Name is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map((error) =>
        errors_data[error.param] = error.msg
        );
        return res.status(400).json({ 
            errors: errors_data,
            status: false,
            message: "Something went wrong"
        });
    }
    next();
}
// specification validation

exports.specificationValidator = (req, res, next) => {
    const errors_data = {};
    req.check('name', 'Specification name is required').notEmpty();
    req.check('code', 'Specification code is required').notEmpty();
    req.check('type', 'Specification Value Type is required').notEmpty();    
    const errors = req.validationErrors();
    let errorFlag = false;

    if (errors) 
    {
        const firstError = errors.map((error) =>
          errors_data[error.param] = error.msg
        );
        errorFlag =true;
        
    }
    if(req.body.type == "attribute" && !req.body.attributeCode){
      errors_data['attributeCode'] = "Attribute is required"
      errorFlag=true;
    }
    if(errorFlag==true){
        return res.status(400).json({ 
          errors: errors_data,
          status: false,
          message: "Something went wrong"
        });
    }
    next();
};

exports.specificationUpdateValidator = (req, res, next) => {
  const errors_data = {};
  req.check('name', 'Specification name is required').notEmpty();
  //req.check('code', 'Specification code is required').notEmpty();
  req.check('type', 'Specification Value Type is required').notEmpty();    
  const errors = req.validationErrors();

  if (errors) 
  {
      const firstError = errors.map((error) =>
        errors_data[error.param] = error.msg
      );
      return res.status(400).json({ 
          errors: errors_data,
          status: false,
          message: "Something went wrong"
      });
  }
  if(req.body.type == "attribute" && !req.body.attributeCode){
    errors_data['attributeCode'] = "Attribute is required"
  }
  next();
};
// category validation
exports.categoryValidator = (req, res, next) => {
    const errors_data = {};
    req.check('name', 'Category name is required').notEmpty();
    req.check('code', 'Category Code is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) 
    {
        const firstError = errors.map((error) =>
        errors_data[error.param] = error.msg
        );
        return res.status(400).json({ 
            errors: errors_data,
            status: false,
            message: "Something went wrong"
        });
    }
    next();
};
exports.categoryUpdateValidator = (req, res, next) => {
  const errors_data = {};
  req.check('name', 'Category name is required').notEmpty();
  //req.check('code', 'Category Code is required').notEmpty();
  const errors = req.validationErrors();
  if (errors) 
  {
      const firstError = errors.map((error) =>
      errors_data[error.param] = error.msg
      );
      return res.status(400).json({ 
          errors: errors_data,
          status: false,
          message: "Something went wrong"
      });
  }
  next();
};
// products
exports.productCreateValidator = (req, res, next) => {
  const errors_data = {};
  req.check('name', 'name is required').notEmpty();
  req.check('code', 'code is required').notEmpty();
  req.check('price', 'price is required.').notEmpty();
  if (req.body.stock) {
    req.check('stock.quantity', 'quantity is required.').notEmpty();
    req.check('stock.dateAvailable', 'dateAvailable is required.').notEmpty();
  }
  if (req.body.links) {
    req.check('links.brand', 'brand is required.').notEmpty();
    for (let i = 0; i < req.body.links.category.length; i++) { 
      let name = `links.category[${i}]`;
      req.check(name, 'code is required.').notEmpty();
    }
  }
  if (req.body.specifications) {
    for (let i = 0; i < req.body.specifications.length; i++) { 
      let name = `specifications[${i}].code`;
      req.check(name, 'code is required.').notEmpty();
      name = `specifications[${i}].value`;
      req.check(name, 'value is required.').notEmpty();
    }
  }
  if (req.body.options) {
    for (let i = 0; i < req.body.options.length; i++) { 
      let name = `options[${i}].type`;
      req.check(name, 'type is required.').notEmpty();
      name = `options[${i}].displayName`;
      req.check(name, 'displayName is required.').notEmpty();
      for (let j = 0; j < req.body.options[i].data.length; j++) { 
        name = `options[${i}].data[${j}].value`;
        req.check(name, `value is required.`).notEmpty();
        name = `options[${i}].data[${j}].quantity`;
        req.check(name, `quantity is required.`).notEmpty();
        name = `options[${i}].data[${j}].substractStock`;
        req.check(name, `substractStock is required.`).notEmpty();
        name = `options[${i}].data[${j}].dateAvailable`;
        req.check(name, `dateAvailable is required.`).notEmpty();
        name = `options[${i}].data[${j}].price`;
        req.check(name, `price is required.`).notEmpty();
      }
    }
  }
  if (req.body.discount) {
    for (let i = 0; i < req.body.discount.length; i++) { 
      let name = `discount[${i}].startDate`;
      req.check(name, 'startDate is required.').notEmpty();
      name = `discount[${i}].endDate`;
      req.check(name, 'endDate is required.').notEmpty();
      name = `discount[${i}].quantity`;
      req.check(name, 'quantity is required.').notEmpty();
      name = `discount[${i}].discount`;
      req.check(name, 'discount is required.').notEmpty();
    }
  }
  if (req.body.specials) {
    for (let i = 0; i < req.body.specials.length; i++) { 
      let name = `specials[${i}].startDate`;
      req.check(name, 'startDate is required.').notEmpty();
      name = `specials[${i}].endDate`;
      req.check(name, 'endDate is required.').notEmpty();
      name = `specials[${i}].price`;
      req.check(name, 'price is required.').notEmpty();
    }
  }
  if (req.body.images) {
    for (let i = 0; i < req.body.images.length; i++) { 
      let name = `images[${i}].name`;
      req.check(name, 'name is required.').notEmpty();
      name = `images[${i}].primaryImage`;
      req.check(name, 'primaryImage is required.').notEmpty();
      name = `images[${i}].content`;
      req.check(name, 'content is required.').notEmpty();
    }
  }
  const errors = req.validationErrors();
  if (errors) 
    {
        const firstError = errors.map((error) =>
        errors_data[error.param] = error.msg
        );
        return res.status(400).json({ 
            errors: errors_data,
            status: false,
            message: "Something went wrong"
        });
    }
    next();
};

exports.productUpdateValidator = (req, res, next) => {
  const errors_data = {};
  req.check('name', 'name is required').notEmpty();
  req.check('price', 'price is required.').notEmpty();
  if (req.body.stock) {
    req.check('stock.quantity', 'quantity is required.').notEmpty();
    req.check('stock.dateAvailable', 'dateAvailable is required.').notEmpty();
  }
  if (req.body.links) {
    req.check('links.brand', 'brand is required.').notEmpty();
    for (let i = 0; i < req.body.links.category.length; i++) { 
      let name = `links.category[${i}]`;
      req.check(name, 'code is required.').notEmpty();
    }
  }
  if (req.body.specifications) {
    for (let i = 0; i < req.body.specifications.length; i++) { 
      let name = `specifications[${i}].code`;
      req.check(name, 'code is required.').notEmpty();
      name = `specifications[${i}].value`;
      req.check(name, 'value is required.').notEmpty();
    }
  }
  if (req.body.options) {
    for (let i = 0; i < req.body.options.length; i++) { 
      let name = `options[${i}].type`;
      req.check(name, 'type is required.').notEmpty();
      name = `options[${i}].displayName`;
      req.check(name, 'displayName is required.').notEmpty();
      for (let j = 0; j < req.body.options[i].data.length; j++) { 
        name = `options[${i}].data[${j}].value`;
        req.check(name, `value is required.`).notEmpty();
        name = `options[${i}].data[${j}].quantity`;
        req.check(name, `quantity is required.`).notEmpty();
        name = `options[${i}].data[${j}].substractStock`;
        req.check(name, `substractStock is required.`).notEmpty();
        name = `options[${i}].data[${j}].dateAvailable`;
        req.check(name, `dateAvailable is required.`).notEmpty();
        name = `options[${i}].data[${j}].price`;
        req.check(name, `price is required.`).notEmpty();
      }
    }
  }
  if (req.body.discount) {
    for (let i = 0; i < req.body.discount.length; i++) { 
      let name = `discount[${i}].startDate`;
      req.check(name, 'startDate is required.').notEmpty();
      name = `discount[${i}].endDate`;
      req.check(name, 'endDate is required.').notEmpty();
      name = `discount[${i}].quantity`;
      req.check(name, 'quantity is required.').notEmpty();
      name = `discount[${i}].discount`;
      req.check(name, 'discount is required.').notEmpty();
    }
  }
  if (req.body.specials) {
    for (let i = 0; i < req.body.specials.length; i++) { 
      let name = `specials[${i}].startDate`;
      req.check(name, 'startDate is required.').notEmpty();
      name = `specials[${i}].endDate`;
      req.check(name, 'endDate is required.').notEmpty();
      name = `specials[${i}].price`;
      req.check(name, 'price is required.').notEmpty();
    }
  }
  if (req.body.images) {
    for (let i = 0; i < req.body.images.length; i++) { 
      let name = `images[${i}].name`;
      req.check(name, 'name is required.').notEmpty();
      name = `images[${i}].primaryImage`;
      req.check(name, 'primaryImage is required.').notEmpty();
      name = `images[${i}].content`;
      req.check(name, 'content is required.').notEmpty();
    }
  }
  const errors = req.validationErrors();
  if (errors) 
    {
        const firstError = errors.map((error) =>
        errors_data[error.param] = error.msg
        );
        return res.status(400).json({ 
            errors: errors_data,
            status: false,
            message: "Something went wrong"
        });
    }
    next();
};

exports.proValidator = (req, res, next) => {
  const errors_data = {};
  req.check('price', 'Price is required').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
      const firstError = errors.map((error) =>
      errors_data[error.param] = error.msg
      );
      return res.status(400).json({ 
          errors: errors_data,
          status: false,
          message: "Something went wrong"
      });
  }
  next();
};