
const mongoose= require('mongoose');
const menuItemsSchema= new mongoose.Schema({
    category:{ type: String, required: true },
    itemName: { type: String, required: true },
    price: { type: Number, required: true },
    image: String,
    available:String,
      
    
});

module.exports= mongoose.model("MenuItemsList",menuItemsSchema);
