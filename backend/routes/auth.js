const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const MenuItemsList= require("../models/menuItemsList");
const RestaurantList =require("../models/RestaurantsLists");
const TablesInfo= require("../models/tablesList")

const router = express.Router();

router.get("/ping", async (req, res) => {
  return res.status(200).json({message: "Service active"})
})

// Register
router.post("/register", async (req, res) => {
  const { name,email,password,phoneNumber,role,restaurantName,addressLine1,addressLine2,city,state,country,postalCode } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({ message: "Fields missing" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ name, email, password: hashedPassword,phoneNumber,role,restaurantName,addressLine1,addressLine2,city,state,country,postalCode });
    console.log(user);
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try{
    const user = await User.findOne({ email });
    // if(!user){
    //    alert("Invalid credentials");
    // }
   if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  // if(!isMatch){
  //   alert("Invalid credentials");
  // }
   if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
 
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role,
                            phoneNumber: user.phoneNumber,restaurantName: user.restaurantName
   } });

  }
  catch{

  }
  
});
// Insert Restaurant
router.post("/restaurants", async (req, res) => {
  const {userId,name,address,postalCode,lat,lon}=req.body
  try {
 
    const restaurant = new RestaurantList({userId,name,address,postalCode,lat,lon});
    await restaurant.save();
    console.log("Restaurant ID:", restaurant._id);
     res.status(201).json({currentRestaurant: { 
        currentResId: restaurant._id,
        name: restaurant.name,
        address: restaurant.address,
        postalCode: restaurant.postalCode,
        lat: restaurant.lat,
        lon: restaurant.lon
}});
   
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
    // Get restaurant
  router.get("/getRestaurant/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
     const restaurant = await RestaurantList.findOne({ userId });

    if (!restaurant) {
      return res.status(404).json({ message: "No restaurant found for this user" });
    }
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
  });

// Insert Menu Item
router.post("/addMenu", async (req, res) => {
  const{restaurantId,category,itemName,price,image,available}=req.body;
  try {
    // const menuItems = await MenuItemsList.find({ restaurantId: localStorage.getItem("SelectedRestaurantId") });
    // console.log(menuItems);
    const menuItem = new MenuItemsList({restaurantId,category,itemName,price,image,available});
    await menuItem.save();
    res.status(201).json({message: "Item Inserted Successfully."});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all menu items for a restaurant
router.get("/getMenu/:restaurantId", async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const menuItems = await MenuItemsList.find({ restaurantId });
     if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({ message: "No MenuItems found for this restaurant." });
    }
    res.status(200).json(menuItems);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
   
});


// Insert Table
router.post("/table", async (req, res) => {
  const {restaurantId,tableNumber,capacity,available}=req.body
  try {
    const table = new TablesInfo({restaurantId,tableNumber,capacity,available});
    await table.save();
    res.status(201).json({message: "Table Details Inserted Successfully."});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tables for a restaurant
router.get("/getTables/:restaurantId", async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const tables = await TablesInfo.find({ restaurantId });
     if (!tables || tables.length === 0) {
      return res.status(404).json({ message: "There is no Seating Arrangement." });
    }
    res.status(200).json(tables);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
  
});




// Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

//Profile Update
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;