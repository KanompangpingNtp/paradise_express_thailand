import { BookOpenIcon, DocumentTextIcon, UserIcon, PhoneIcon, MailIcon } from "@heroicons/react/24/outline";

const InputField = ({ label, id, type = "text", value, onChange, placeholder, icon }) => {
  return (
    <div className="flex flex-col relative">
      <label htmlFor={id} className="text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {/* ไอคอนแสดงอยู่ด้านซ้าย */}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full text-center border border-gray-300 bg-gray-200 text-gray-700 px-4 py-2 rounded-md pl-10 ${icon ? 'pr-3' : 'pr-4'}`}
        />
      </div>
    </div>
  );
};

export default InputField;
