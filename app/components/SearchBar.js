import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'; // นำเข้าไอคอนจาก Heroicons

const SearchBar = ({ onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value); // ส่งค่ากลับเมื่อผู้ใช้พิมพ์
  };

  return (
    <div className="flex justify-center mt-4">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search Tour"
          onChange={handleChange} // เมื่อพิมพ์ค่าจะถูกส่งออก
          className="w-full text-center bg-white text-gray-700 border-2 border-orange-500 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 pr-10" // เพิ่ม padding ขวาสำหรับไอคอน
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" /> {/* ไอคอนค้นหาถูกวางไว้ที่ด้านซ้าย */}
      </div>
    </div>
  );
};

export default SearchBar;