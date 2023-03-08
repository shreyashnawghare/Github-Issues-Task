import axios from "axios";
import { useEffect, useState } from "react";
import Issues from "./components/Issues";
import Pagination from "./components/Pagination";

function App() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const totalItems = issues.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  //handling click of Previous button
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  //handling click of next button
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  //Get Current issues-
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //dividing issues array in different pages
  const currentItems = issues.slice(indexOfFirstItem, indexOfLastItem);
  //navigating particular page on click of particular page number
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const result = await axios.get(
        `https://api.github.com/repositories/1300192/issues?page=${currentPage}`
      );
      console.log(result);
      setIssues(result.data);
      setLoading(false);
    };
    getData();
  }, [currentPage]);

  // loader

  if (loading) {
    return (
      <div className="App">
        <nav className="nav">
          <h1>
            <i className="fa-brands fa-github"></i> Github Issues
          </h1>
        </nav>
        <div className="app-spinner"></div>
      </div>
    );
  }

  return (
    <div className="App">
      <nav className="nav">
        <h1>
          <i className="fa-brands fa-github"></i> Github Issues
        </h1>
      </nav>
      <div className="issues-container">
        <Issues issues={currentItems} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default App;
