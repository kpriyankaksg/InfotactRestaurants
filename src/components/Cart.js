import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.items);
  console.log("cart", cart);
  const userDetails= useSelector((appStore)=> appStore.user.user);
  const navigate=useNavigate();

  // Calculate total only for menu items (tables are not billed)
  const itemsTotal = cart.reduce((sum, item) => {
    if (item.type === "menu") {
      return sum + item.price * item.quantity;
    }
    return sum;
  }, 0);

  const deliveryFee = 99;
  const grandTotal = itemsTotal + (itemsTotal > 0 ? deliveryFee : 0);

// for ordering food from multiple restaurants
const groupedRestaurants = cart.reduce((acc, item) => {
  const { restaurantId } = item;
  if (!acc[restaurantId]) {
    acc[restaurantId] = { restaurantId, items: [], tables: [] };
  }
  if (item.type === "menu") {
    acc[restaurantId].items.push(item);
  } else if (item.type === "table") {
    acc[restaurantId].tables.push(item);
  }
  return acc;
}, {});
const restaurantsArray = Object.values(groupedRestaurants);



// handling checkout
const handleCheckOut=async ()=>{
   try {
    // Step 1: Create order
    const orderRes = await axios.post("http://localhost:5000/api/order", {
      userId: userDetails.user.id, // replace with logged-in user
      restaurants: restaurantsArray,
      // restaurantId: cart[0].restaurantId, // current restaurant
      // items: cart.filter((i) => i.type === "menu"),
      //tables: cart.filter((i) => i.type === "table"),
      totalAmount: grandTotal
    });
    console.log(orderRes.data);

    const orderId = orderRes.data._id;

    // Step 2: Simulate payment
    const paymentRes = await axios.post("http://localhost:5000/api/payment/checkout", {
      orderId,
      amount: grandTotal
    });

    if (paymentRes.data.success) {
      alert("Payment successful! Order status updated to Paid.");
      navigate("/body/myOrders");
    } else {
      alert("Payment failed. Try again.");
    }
  } catch (err) {
    console.error(err);
    alert("Error during checkout.");
  }

}



  return (
    <div className="pt-24 ml-64 p-8 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {(cart.length === 0) && <img alt="cartLogo" className="px-60" 
      src="https://qrstore.in/home_assets/img/empty-cart.png"/>}

      <ul className="space-y-2">
        {cart.map((item, idx) => (
          <li
            key={idx}
            className="border p-3 rounded flex justify-between items-center"
          >
            {item.type === "table" ? (
              <span>
                Reserved Table {item.tableNumber} (Capacity {item.capacity})
              </span>
            ) : (
              <span>
                {item.itemName} - ₹{item.price} × {item.quantity}
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* Show totals */}
      {itemsTotal > 0 && (
        <div className="mt-6 border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Items Total</span>
            <span>₹{itemsTotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Grand Total</span>
            <span>₹{grandTotal}</span>
          </div>
        </div>
      )}

      {cart.length > 0 && (
        <button onClick={handleCheckOut} className="bg-green-600 text-white px-4 py-2 rounded mt-6 w-full">
          Proceed to Payment
        </button>
      )}
    </div>
  );
};

export default CartPage;