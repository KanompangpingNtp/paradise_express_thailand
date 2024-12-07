// Select2Component.js
import React, { useEffect } from "react";
import $ from "jquery";
import "select2/dist/css/select2.css";
import "select2";

const Select2Component = ({ id, label, options, onSelect, loading }) => {
  useEffect(() => {
    // Initialize Select2
    $(`#${id}`).select2();

    // Handle select event
    $(`#${id}`).on("select2:select", function (e) {
      const selectedData = e.params.data;
      onSelect(selectedData.id);
    });

    // Destroy Select2 on component unmount
    return () => {
      if ($(`#${id}`).hasClass("select2-hidden-accessible")) {
        $(`#${id}`).select2("destroy");
      }
    };
  }, [id, onSelect]);

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold">{label}</label>
      <select
        id={id}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue=""
      >
        <option value="" disabled> Select an option </option>
        {loading ? (
          <option value="">Loading...</option>
        ) : options.length > 0 ? (
          options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))
        ) : (
          <option value="">No options available</option>
        )}
      </select>
    </div>
  );
};

// ตรวจสอบให้แน่ใจว่า export default ได้ทำการ export คอมโพเนนต์
export default Select2Component;
