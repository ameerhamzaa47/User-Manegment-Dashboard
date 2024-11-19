import { useEffect, useState } from "react";
import User from "../Type/Interface";
import Pagination from "./Pagination";
import Navbar from "./Navbar";
import Filter from "./Filter";

function Dashboard() {
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [filters, setFilters] = useState<{ age: string[]; gender: string[] }>({ age: [], gender: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  const resultsPerPage = 5;

  // Fetch data from API
  async function fetchData(page: number) {
    const res = await fetch(`https://randomuser.me/api/?results=50&page=${page}`);
    const resp = await res.json();
    setData(resp.results);
  }

  // Apply filters to the data
  const applyFilters = () => {
    let filtered = [...data];

    // Filter by age
    if (filters.age.length > 0) {
      filtered = filtered.filter(user => {
        const age = user.dob.age;
        return filters.age.some(range => {
          if (range === 'under20' && age < 20) return true;
          if (range === '20-30' && age >= 20 && age <= 30) return true;
          if (range === '30-40' && age >= 30 && age <= 40) return true;
          if (range === '40+' && age > 40) return true;
          return false;
        });
      });
    }

    // Filter by gender
    if (filters.gender.length > 0) {
      filtered = filtered.filter(user => filters.gender.includes(user.gender));
    }

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.name.last.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const handleFilterChange = (newFilters: { age: string[]; gender: string[] }) => {
    setFilters(newFilters); 
  };

  // Paginate the filtered data
  const totalResults = filteredData.length;
  const startIndex = (currentPage - 1) * resultsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + resultsPerPage);


  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    applyFilters();
  }, [filters, searchTerm, data]);

  return (
    <div className="min-h-screen pt-10 bg-gray-100">
      <Navbar onSearch={setSearchTerm} />
      
      <div className="flex flex-col md:flex-row justify-between mx-10 my-8 space-y-10 md:space-y-0">
        <Filter onFilterChange={handleFilterChange} />
        
        <div className="w-full md:w-4/6 mx-5 bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Dashboard</h1>

          <div className="overflow-x-auto">
            {filteredData.length === 0 && searchTerm && (
              <div className="text-center text-red-600 font-medium mb-4">
                No results found for "{searchTerm}".
              </div>
            )}
            <table className="min-w-full table-auto border-collapse text-sm text-left text-gray-800">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Age</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">City/Country</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={index}>
                    <td className="py-3 px-4">{(currentPage - 1) * resultsPerPage + index + 1}</td>
                    <td className="py-3 px-4 flex items-center">
                      <img src={item.picture.large} alt={`${item.name.first} ${item.name.last}`} className="w-8 h-8 rounded-full mr-3" />
                      {item.name.first} {item.name.last}
                    </td>
                    <td className="py-3 px-4">{item.dob.age}</td>
                    <td className="py-3 px-4">{item.email}</td>
                    <td className="py-3 px-4">{item.phone}</td>
                    <td className="py-3 px-4">{item.location.city}, {item.location.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination currentPage={currentPage} totalResults={totalResults} resultsPerPage={resultsPerPage} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;