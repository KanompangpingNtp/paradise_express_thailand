const TourOverview = ({ description, items }) => {
  return (
    <div>
      {/* แสดง description */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Overview</h2>
        <p className="text-gray-700">{description}</p>
      </div>

      {/* แสดง items */}
      {items && items.length > 0 && (
        <div className="mt-6 bg-gray-100 p-5">
          <h3 className="text-xl font-bold mb-2">Highlights</h3>
          <ul className="list-disc pl-6 space-y-2 ">
            {items.map((item, index) => (
              <li key={index} className="text-gray-700">
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
