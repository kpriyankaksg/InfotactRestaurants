
const mongoose= require('mongoose');
const tableSchema= new mongoose.Schema({
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "RestaurantsLists", required: true },
    tableNumber: { type: String, required: true },
    capacity: { type: Number, required: true },
    available: { type: Boolean, default: true },
 
});

module.exports= mongoose.model("tablesList",tableSchema);