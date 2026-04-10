
const mongoose= require('mongoose');
const restaurantsSchema= new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true}, 
   name: { type: String, required: true },
   address: { type: String, required: true },
  postalCode:  { type: String, required: true },
  //  lat:  { type: Number, required: true },
  // lon:  { type: Number, required: true }
  rating: { type: Number, default: 0 }, // average rating for sorting
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  }
   });

// Create geospatial index
restaurantsSchema.index({ location: "2dsphere" });



module.exports= mongoose.model("RestaurantsLists",restaurantsSchema);
