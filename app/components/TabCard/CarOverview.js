import {
  InformationCircleIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const TourOverview = ({ description }) => {
  return (
    <div className="shadow-xl p-6 rounded-lg bg-white text-gray-700 mx-auto">
      {/* แสดงหัวข้อ Overview */}
      <div className="">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
          <InformationCircleIcon className="w-8 h-8 text-orange-600 mr-4" />
          <span>Overview</span>
        </h2>
      </div>

      {/* แสดงรายละเอียด */}
      <div className="space-y-4">
        {/* ข้อมูลยี่ห้อและรุ่นรถ */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mt-5">
          <p className="text-2xl font-semibold text-orange-500 uppercase">
            {description.car_brand_name} {description.car_model_name}
          </p>
          <div className="flex items-center space-x-2 text-gray-600">
            <p className="text-2xl font-bold">
              COST:{" "}
              <span className="text-green-500">{description.data_price} THB</span>
            </p>
          </div>
        </div>

        {/* ข้อมูลเส้นทาง */}
        <div className="space-y-2 text-gray-600">
          <p className="text-lg">ROUTE MAIN: {description.route_name}</p>
          <p className="text-lg">DETAILS: {description.route_detail_name}</p>
        </div>
      </div>
    </div>
  );
};

export default TourOverview;
