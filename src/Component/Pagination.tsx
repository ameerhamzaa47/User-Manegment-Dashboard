interface PaginationProps {
    currentPage: number;
    totalResults: number;
    resultsPerPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  }  
  function Pagination({currentPage,totalResults,resultsPerPage,setCurrentPage}: PaginationProps) {
    const totalPages = Math.ceil(totalResults / resultsPerPage);
  
    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        {/* Mobile view:*/}
        <div className="flex flex-1 justify-between sm:hidden">
          <button onClick={handlePrevPage} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" disabled={currentPage === 1}>Previous</button>
          <button onClick={handleNextPage} className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" disabled={currentPage === totalPages}>Next</button>
        </div>
  
        {/* Desktop view: */}
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(currentPage - 1) * resultsPerPage + 1}</span> to{" "}
              <span className="font-medium">{Math.min(currentPage * resultsPerPage, totalResults)}</span> of{" "}
              <span className="font-medium">{totalResults}</span> results
            </p>
          </div>
          <div>

            <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              {/* Previous button */}
              <button onClick={handlePrevPage} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" disabled={currentPage === 1}>
                <span className="sr-only">Previous</span>
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" >
                  <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                </svg>
              </button>
  
              {/* Pagination buttons for each page */}
              {[...Array(totalPages)].map((_, idx) => {
                const page = idx + 1;
                return (
                  <button key={page} onClick={() => handlePageChange(page)} className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 ${page === currentPage ? "bg-indigo-600 text-white" : ""}`}>{page}</button>
                );
              })}
  
              {/* Next button */}
              <button onClick={handleNextPage} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" disabled={currentPage === totalPages} >
                <span className="sr-only">Next</span>
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" >
                  <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  }
  
  export default Pagination;
  