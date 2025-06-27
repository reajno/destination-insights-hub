import { useState, useEffect } from "react";
import { yearMap } from "@/utils/maps";

const YearSelect = ({ onYearChange }) => {
  const [year, setYear] = useState("2024");

  useEffect(() => {
    onYearChange(year);
    // Call the onYearChange callback whenever the date changes
    //
    // In parent component, you can use it like this:
    // const [year, setYear] = useState("");
    // <YearSelect onYearChange={setYear}/>
    //
    // This will update the year in the parent component whenever it changes
    // Then use year value from parent component in the fetch request
  }, [year]);

  return (
    <>
      <select
      className="border border-gray-300 px-3 py-2 rounded-md text-sm shadow-sm focus:ring focus:ring-blue-200"
        value={year}
        onChange={(e) => {
          setYear(e.target.value);
        }}
      >
        {yearMap.map((year) => (
        <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </>
  );
};
export default YearSelect;
