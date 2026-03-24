
const mongoose= require('mongoose');
const menuItemsSchema= new mongoose.Schema({
    restaurantid: { type: String, required: true },
    category:{ type: String, required: true },
    itemslist:[
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: String,
        imageid: String,
        isAvailable:String,
      }
    ]  
});

module.exports= mongoose.model("MenuItems",menuItemsSchema);
