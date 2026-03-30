
const mongoose= require('mongoose');
const menuItemsSchema= new mongoose.Schema({
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "RestaurantsLists", required: true },
    category: { type: String, required: true },
    itemName: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    available: { type: Boolean, default: true },
 
});



module.exports= mongoose.model("menuItemsList",menuItemsSchema);
