const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const MenuItemsList= require("../models/menuItemsList")

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

// MenuItemsList
router.post("/MenuItemsList", async (req, res) => {
  const {category, itemName, price,image,available} = req.body;
  console.log(req.body);
  try {
    const newItem = new MenuItemsList({category, itemName, price, image,available });
    console.log(newItem);
    await newItem.save();
    res.status(201).json({ message: "New Item added successfully" });
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