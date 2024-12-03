// InputField.js
const InputField = ({ label, id, type = "text", value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange} // ตรวจสอบว่า onChange ทำงานถูกต้อง
        placeholder={placeholder}
        className="border border-gray-300 bg-gray-200 text-black px-4 py-2 rounded-md"
      />
    </div>
  );
};

export default InputField;
