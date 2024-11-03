import React, { useEffect, useState } from "react";

const Trending = () => {
  const [trendingMedicines, setTrendingMedicines] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMedicines = async () => {
      try {
        const fakeData =[
          {
              "createdDate": "2024-11-03T14:23:07",
              "lastModifiedDate": "2024-11-03T15:07:27",
              "id": 1,
              "name": "aspirin",
              "quantity": 21,
              "date": "2024-11-03"
          },
          {
              "createdDate": "2024-11-03T14:24:09",
              "lastModifiedDate": "2024-11-03T15:07:12",
              "id": 2,
              "name": "para",
              "quantity": 20,
              "date": "2024-11-03"
          },
          {
              "createdDate": "2024-11-03T15:07:22",
              "lastModifiedDate": "2024-11-03T15:07:22",
              "id": 3,
              "name": "aaspirn",
              "quantity": 10,
              "date": "2024-11-03"
          },
          {
              "createdDate": "2024-11-03T15:07:31",
              "lastModifiedDate": "2024-11-03T15:07:31",
              "id": 4,
              "name": "jamal ghota",
              "quantity": 10,
              "date": "2024-11-03"
          },
          {
              "createdDate": "2024-11-03T15:11:37",
              "lastModifiedDate": "2024-11-03T15:15:49",
              "id": 5,
              "name": "aa",
              "quantity": 30,
              "date": "2024-11-03"
          }
      ]
        setTrendingMedicines(fakeData);
      } catch (error) {
        setError("Failed to load trending medicines. Please try again later.");
        console.error("Error fetching trending medicines:", error);
      }
    };
    fetchTrendingMedicines();
  }, []);

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    // boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(3px)",
    WebkitBackdropFilter: "blur(3px)",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.18)",
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center px-8 py-6 bg-gray-900">
      <h1 className="text-3xl font-semibold text-gray-200 mb-6">
        Trending Medicines
      </h1>

      {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {trendingMedicines.map((medicine) => (
          <div
            key={medicine.id}
            className="bg-blue-100 rounded-lg shadow-sm overflow-hidden transform transition duration-300 hover:scale-105 flex"
            style={cardStyle}
          >
            {/* Right side with the details */}
            <div className="p-6 w-full">
              <h2 className="text-2xl font-bold text-white mb-2">
                {medicine.name.toUpperCase()}
              </h2>
              <p className="text-gray-700 text-md mb-1">
                <span className="font-semibold text-blue-200">Quantity:</span> <span className="text-white">{medicine.quantity}</span>
              </p>
              <p className="text-gray-700 text-md mb-1">
                <span className="font-semibold text-blue-200">Date:</span> <span className="text-white">{medicine.date}</span>
              </p>
              <p className="text-gray-700 text-md mb-1">
                <span className="font-semibold text-blue-200">Created:</span> <span className="text-white">{medicine.createdDate}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
