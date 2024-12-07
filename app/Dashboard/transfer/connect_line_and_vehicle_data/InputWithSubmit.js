import React from "react";

const InputWithSubmit = ({ price, setPrice, handleSubmit }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold">Price</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter price"
        className="w-full p-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white p-2 rounded-lg w-full"
      >
        Submit
      </button>
    </div>
  );
};

export default InputWithSubmit;
