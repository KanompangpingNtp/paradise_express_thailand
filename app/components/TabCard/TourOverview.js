import { InformationCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';

const TourOverview = ({ description, items }) => {
  return (
    <div className="shadow-xl p-5 text-gray-700">
      {/* แสดง description */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2 flex items-center">
          {/* ใช้ไอคอนสีเทาเข้ม */}
          <InformationCircleIcon className="w-6 h-6 text-gray-600 mr-2" />
          Overview
        </h2>
        <p className="text-gray-700">{description}</p>
      </div>

      {/* แสดง items */}
      {items && items.length > 0 && (
        <div className="mt-6 bg-gray-100 p-5 rounded-lg">
          <h3 className="text-xl font-bold mb-2 flex items-center">
            {/* ใช้ไอคอนสีส้ม */}
            <SparklesIcon className="w-6 h-6 text-orange-500 mr-2" />
            Highlights
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-center text-gray-700">
                {/* ใช้ไอคอนสีส้ม */}
                <SparklesIcon className="w-4 h-4 text-orange-500 mr-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TourOverview;
