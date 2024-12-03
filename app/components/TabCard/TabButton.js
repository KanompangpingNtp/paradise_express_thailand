const TabButton = ({ label, isActive, onClick }) => (
  <button
    className={`px-6 py-3 text-base font-medium rounded-t-lg transition-colors duration-300 ${
      isActive
        ? 'bg-orange-500 text-white hover:bg-orange-600'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default TabButton;
