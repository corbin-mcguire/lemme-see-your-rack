import { useState } from "react";
import useRackStore from "../store/rackStore";

export default function RackForm() {
  const addItem = useRackStore((state) => state.addItem);
  const setRackSize = useRackStore((state) => state.setRackSize);
  const rackSize = useRackStore((state) => state.rackSize);

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
      className="sticky top-6 bg-white p-6 rounded-lg shadow-md"
    >
      <div className="mb-6 pb-6 border-b border-gray-200">
        <label
          htmlFor="rackSize"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Rack Size (U)
        </label>
        <select
          id="rackSize"
          value={rackSize}
          onChange={handleRackSizeChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {[...Array(44)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}U
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="slots"
          className="block text-sm font-medium text-gray-700"
        >
          Number of Slots (U)
        </label>
        <select
          id="slots"
          name="slots"
          value={formData.slots}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select slots</option>
          {[...Array(44)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}U
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="color"
          className="block text-sm font-medium text-gray-700"
        >
          Color
        </label>
        <input
          type="color"
          id="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
          className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="link"
          className="block text-sm font-medium text-gray-700"
        >
          Product Link
        </label>
        <input
          type="url"
          id="link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="https://example.com"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Rack Item
      </button>
    </form>
  );
}
