const mongoose = require('mongoose');
mongoose
    .connect("mongodb://localhost/ecommerce", {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected'));


const accessModule = new mongoose.Schema(
    {
        name: String,
        label: String,
        created_date: {
            type: Date,
            default: Date.now
        }
    }
);

const AccessModuleSchema  = mongoose.model("AccessModuleMaster", accessModule);


var data = [
    {   
        name: "product",
        label: "Product Management"
    },
    {
        name: "customer",
        label: "Customer Management"
    },
    {
        name: "payment",
        label: "Payment Management"
    },
    {
        name: "users",
        label: "User Management"
    },
    {
        name: "store",
        label: "Store Management"
    },
    {
        name: "orders",
        label: "Orders Manangement"
    },
    {
        name: "notification",
        label: "Notification"
    },
    {
        name: "reports",
        label: "Report Management"
    },
]
const accessModuleInstance = new AccessModuleSchema();
data.map(item =>
        {
                                                                                                                                        console.log('item',item);
         
})

//Save module to database
console.log(accessModuleInstance);
 accessModuleInstance.save(function (err) {
    if (err){
               return console.log("Errors : ", err);
            }
    // saved!
  });
// accessModuleInstance.save(data , error => {
//     if(error){
//        return console.log("Errors : ", error);
//     }else{
//         console.log(data._id + "save to AccessModuleMaster collection.");
//     }

// })