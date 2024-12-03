import TourCard from "@/app/components/TourCard";
import Link from "next/link";

const TourAll = ({ sectionName, tours }) => {
  return (
    <div className="container mx-auto px-2 sm:px-8 pb-10">
      <div className="text-gray-700 text-2xl sm:text-4xl font-bold text-center py-10">
      {sectionName}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-3 sm:gap-8">
        {tours.slice(0, 8).map((tour, index) => (
          <TourCard key={index} card={tour} />
        ))}
      </div>

      <div className="flex justify-center w-full text-center sm:justify-end items-center text-gray-700 mt-4">
        <Link
          href={{
            pathname: "/pages/allTour",
            query: { tours: JSON.stringify(tours) }, // ส่ง tours ใน query
          }}
          passHref
          className="bg-gray-700 text-white py-3 px-5 w-full 2xl:w-40 hover:text-orange-500 hover:bg-gray-900 duration-200 rounded-2xl cursor-pointer"
        >
          VIEW ALL
        </Link>
      </div>
    </div>
  );
};

export default TourAll;
