import Papa from "papaparse";

// Wrapped promise to access inner callback results asynchronously
const parseCSV = (csvString) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results),
      error: (error) => reject(error),
    });
  });
};

export default parseCSV;
