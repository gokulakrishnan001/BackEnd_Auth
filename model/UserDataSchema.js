const mongoose = require("mongoose");

const UserDataSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Enter a Product name"],
    },
    password: {
      type: String,
      required: true,
    }
  },
);

const userDataModel=mongoose.model("userData",UserDataSchema)



module.exports=userDataModel
