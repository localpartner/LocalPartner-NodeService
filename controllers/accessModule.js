const AccessModuleSchema = require('../models/accessModule');

exports.accessModule = async (req , res) =>{
    AccessModuleSchema.find(function (err, data) {
        if (err) {
          return done(err);
        }
        return res.json({
          status: true,
          result: data,
        });
    });
}