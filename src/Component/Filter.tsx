import React, { useState } from "react";

interface FilterProps {
  onFilterChange: (filters: { age: string[]; gender: string[] }) => void;
}

function Filter({ onFilterChange }: FilterProps) {
  const [selectedAge, setSelectedAge] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);

  // Handle checkbox changes
  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedAge((prev) =>
      event.target.checked
        ? [...prev, value]
        : prev.filter((item) => item !== value)
    );
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedGender((prev) =>
      event.target.checked
        ? [...prev, value]
        : prev.filter((item) => item !== value)
    );
  };

  // Update filters on submit
  const handleFilterSubmit = () => {
    onFilterChange({
      age: selectedAge,
      gender: selectedGender,
    });
  };

  return (
    <div className="w-full md:w-1/4 p-6 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-white text-center mb-6">Filter</h1>

      <h2 className="text-xl text-white font-semibold mb-4">Age</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input className="w-5 h-5 rounded-full text-blue-400 bg-white border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500" type="checkbox" value="under20" onChange={handleAgeChange} />
          <label className="text-white text-lg font-medium">Under 20</label>
        </div>

        <div className="flex items-center space-x-3">
          <input className="w-5 h-5 rounded-full text-green-400 bg-white border-2 border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500" type="checkbox" value="20-30" onChange={handleAgeChange} />
          <label className="text-white text-lg font-medium">20-30</label>
        </div>

        <div className="flex items-center space-x-3">
          <input className="w-5 h-5 rounded-full text-yellow-400 bg-white border-2 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" type="checkbox" value="30-40" onChange={handleAgeChange} />
          <label className="text-white text-lg font-medium">30-40</label>
        </div>

        <div className="flex items-center space-x-3">
          <input className="w-5 h-5 rounded-full text-red-400 bg-white border-2 border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500" type="checkbox" value="40+" onChange={handleAgeChange} />
          <label className="text-white text-lg font-medium">40+</label>
        </div>
      </div>

      <h2 className="text-xl text-white font-semibold mb-4">Gender</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input className="w-5 h-5 rounded-full text-blue-400 bg-white border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500" type="checkbox" value="male" onChange={handleGenderChange} />
          <label className="text-white text-lg font-medium">Male</label>
        </div>
        <div className="flex items-center space-x-3">
          <input className="w-5 h-5 rounded-full text-red-400 bg-white border-2 border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500" type="checkbox" value="female" onChange={handleGenderChange} />
          <label className="text-white text-lg font-medium">Female</label>
        </div>
      </div>

      <button onClick={handleFilterSubmit} className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 mt-6 rounded-md">Apply Filters</button>
    </div>
  );
}

export default Filter;