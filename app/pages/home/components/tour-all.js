import TourCard from "@/app/components/TourCard";
import Link from "next/link";

const TourAll = ({ sectionName, tours }) => {
  return (
    <div className="container mx-auto pb-10 px-1 sm:px-8">
      <div className="text-gray-700 text-2xl sm:text-4xl font-bold text-center py-8 uppercase tracking-normal">
      {sectionName}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-3 sm:gap-8">
        {tours.slice(0, 8).map((tour, index) => (
          <TourCard key={index} card={tour} />
        ))}
      </div>

      <div className="flex justify-center w-full text-center items-center mt-4">
        <Link
          href={{
            pathname: "/pages/allTour",
            query: { tours: JSON.stringify(tours) }, // ส่ง tours ใน query
          }}
          passHref
          className="text-gray-700 py-8 px-5 w-full hover:text-orange-500 hover:bg-gray-300 bg-opacity-60 duration-200 cursor-pointer uppercase tracking-normal hover:tracking-wider"
        >
          VIEW ALL {sectionName}
        </Link>
      </div>
    </div>
  );
};

export default TourAll;
