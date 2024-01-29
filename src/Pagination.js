import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./pagination.module.css";

const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [fetchError, setFetchError] = useState(false);
  const recordsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/member.json"
        );
        setData(response.data);
        setTotalPages(Math.ceil(response.data.length / recordsPerPage));
      } catch (error) {
        setFetchError(true);
        alert("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (fetchError) {
    return null; // Return nothing if there's a fetch error
  }

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className={styles.container}>
      <h1>Employee Data Table</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.headerCell}>ID</th>
            <th className={styles.headerCell}>Name</th>
            <th className={styles.headerCell}>Email</th>
            <th className={styles.headerCell}>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record) => (
            <tr key={record.id}>
              <td className={styles.dataCell}>{record.id}</td>
              <td className={styles.dataCell}>{record.name}</td>
              <td className={styles.dataCell}>{record.email}</td>
              <td className={styles.dataCell}>{record.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          className={styles.button}
          onClick={handlePrevClick}
          // disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className={styles.pageNumber}>{currentPage}</span>
        <button
          className={styles.button}
          onClick={handleNextClick}
          // disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
