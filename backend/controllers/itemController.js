
import Item from "../models/menuItemsList.js";

export const updateItemStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { available } = req.body;

    const item = await Item.findByIdAndUpdate(
      id,
      { available },
      { new: true }
    );

    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Error updating item", error: err.message });
  }
};