import menuItems from './menuItems';

const mongoose= require('mongoose');
const ordersSchema= new mongoose.Schema({
    orderId: { type: String, required: true, unique: true }, // or use mongoose's default _id
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [menuItems], // Array of subdocuments
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Preparing', 'Out for delivery', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  deliveryAddress: { type: String, required: true },

});

module.exports= mongoose.model("Orders",ordersSchema);