import { useState, useEffect } from "react";
import { lgaMap } from "@/utils/maps";

const LGASelect = ({ onLGAChange }) => {
  const [lgaName, setLgaName] = useState("");

  useEffect(() => {
    onLGAChange(lgaName);
    // Call the onDateChange callback whenever the date changes
    //
    // In parent component, you can use it like this:
    // const [lga,setLgaName] = useState("");
    // <LGASelect onLGAChange={setLgaName}/>
    //
    // This will update the LGA in the parent component whenever it changes
    // Then use LGA value from parent component in the fetch request
  }, [lgaName]);

  return (
    <>
      <select
        className="border border-gray-300 px-3 py-2 rounded-md text-sm shadow-sm focus:ring focus:ring-blue-200"
        value={lgaName}
        onChange={(e) => {
          setLgaName(e.target.value);
        }}
      >
        {Object.keys(lgaMap).map((lga) => (
          <option key={lga} value={lga}>
            {lgaMap[lga].label}
          </option>
        ))}
      </select>
    </>
  );
};
export default LGASelect;
