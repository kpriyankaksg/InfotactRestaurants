import { useSelector } from "react-redux";

const Menu = () => {
  const menuItems = useSelector((store) => store.partner.menuItems);
  const tables = useSelector((store) => store.partner.tables);

  return (
    <div className="pt-24 ml-64 p-8 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-8">Menu & Seating</h1>

      {/* Menu Items */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Menu Items</h2>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id} className="border p-3 rounded flex justify-between">
              <span>{item.name} - ₹{item.price} ({item.category})</span>
              <span>{item.available ? "✅ Available" : "❌ Not Available"}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Tables */}
      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Seating Arrangement</h2>
        <ul className="space-y-2">
          {tables.map((table) => (
            <li key={table.id} className="border p-3 rounded flex justify-between">
              <span>Table {table.tableNumber} - Capacity {table.capacity}</span>
              <span>{table.available ? "✅ Available" : "❌ Not Available"}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Menu;