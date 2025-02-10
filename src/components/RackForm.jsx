import { useState } from "react";
import useRackStore from "../store/rackStore";

export default function RackForm() {
  const addItem = useRackStore((state) => state.addItem);
  const setRackSize = useRackStore((state) => state.setRackSize);
  const rackSize = useRackStore((state) => state.rackSize);
  const totalUsedSlots = useRackStore((state) => state.totalUsedSlots);

  const [formData, setFormData] = useState({
    name: "",
    slots: "",
    color: "#000000",
    price: "",
    link: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRackSizeChange = (e) => {
    if (Number(e.target.value) < totalUsedSlots) {
      return;
    }

    setRackSize(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem({
      ...formData,
      slots: parseInt(formData.slots),
      price: parseFloat(formData.price),
      id: crypto.randomUUID(),
    });

    setFormData({
      name: "",
      slots: "",
      color: "#000000",
      price: "",
      link: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 p-6 rounded-lg shadow-md space-y-6 shadow-slate-900"
    >
      <div className="mb-8 pb-6 border-b border-gray-200">
        <label
          htmlFor="rackSize"
          className="block text-sm font-medium text-white mb-2"
        >
          Rack Size (U)
        </label>
        <select
          id="rackSize"
          value={rackSize}
          onChange={handleRackSizeChange}
          className="mt-2 block w-full p-2.5 rounded-md bg-slate-700 border-slate-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {[...Array(44)].map((_, i) => (
            <option key={i + 1} value={i + 1} disabled={i + 1 < totalUsedSlots}>
              {i + 1}U
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Dell PowerEdge R740"
            className="mt-2 block w-full p-2.5 rounded-md bg-slate-700 border-slate-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder-slate-400"
            required
          />
        </div>

        <div>
          <label
            htmlFor="slots"
            className="block text-sm font-medium text-white mb-2"
          >
            Number of Slots (U)
          </label>
          <select
            id="slots"
            name="slots"
            value={formData.slots}
            onChange={handleChange}
            className="mt-2 block w-full p-2.5 rounded-md bg-slate-700 border-slate-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select number of rack units</option>
            {[...Array(44)].map((_, i) => (
              <option
                key={i + 1}
                value={i + 1}
                disabled={i + 1 + totalUsedSlots > rackSize}
              >
                {i + 1}U
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="color"
            className="block text-sm font-medium text-white mb-2"
          >
            Color
          </label>
          <input
            type="color"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="mt-2 block w-full h-12 p-1 rounded-md bg-slate-700 border-slate-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-white mb-2"
          >
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="0.00"
            className="mt-2 block w-full p-2.5 rounded-md bg-slate-700 border-slate-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder-slate-400"
          />
        </div>

        <div>
          <label
            htmlFor="link"
            className="block text-sm font-medium text-white mb-2"
          >
            Product Link
          </label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://example.com/product"
            className="mt-2 block w-full p-2.5 rounded-md bg-slate-700 border-slate-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder-slate-400"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors hover:cursor-pointer"
      >
        Add Rack Item
      </button>
    </form>
  );
}
