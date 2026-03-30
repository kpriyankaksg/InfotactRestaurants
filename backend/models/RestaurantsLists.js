
const mongoose= require('mongoose');
const restaurantsSchema= new mongoose.Schema({
   name: { type: String, required: true },
   address: { type: String, required: true },
  postalCode:  { type: Number, required: true },
   lat:  { type: Number, required: true },
  lon:  { type: Number, required: true }
  
});


module.exports= mongoose.model("RestaurantsLists",restaurantsSchema);
