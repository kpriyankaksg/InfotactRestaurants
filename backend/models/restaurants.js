
const mongoose= require('mongoose');
const restaurantsSchema= new mongoose.Schema({
   name: { type: String, required: true },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String
    },
    telephone: String,
    cuisines:[{ type: String, required: true }] ,
    rating: Number,
    availability: String,
    location: {
    type: {
      type: String, 
      enum: ['Point'], 
      default: 'Point'
    },
    coordinates: {
      type: [Number, Number], // [Longitude, Latitude]
      required: false // Make this false if not every restaurant has a location
    }
  },
});


module.exports= mongoose.model("Restaurants",restaurantsSchema);
