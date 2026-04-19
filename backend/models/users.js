 const mongoose = require('mongoose');
//import mongoose from "mongoose";


const userSchema= new mongoose.Schema({

  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String},
  role: { type: String, required: true, enum: ['Customer', 'Partner','Admin'] },
  restaurantName: { type: String},
  addressLine1: { type: String},
  addressLine2: { type: String},
  city: { type: String},
  state: { type: String},
  country: { type: String},
  postalCode: { type: String}
 
});

 module.exports= mongoose.model("Users", userSchema);
// export default mongoose.models.Users || mongoose.model("Users", userSchema);
