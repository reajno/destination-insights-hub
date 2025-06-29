import { useState, useEffect } from "react";
import { yearMap } from "@/utils/maps";
import { NativeSelect } from "@chakra-ui/react";

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
    <NativeSelect.Root w={"100px"}>
      <NativeSelect.Field
        value={year}
        onChange={(e) => setYear(e.target.value)}
        border={"2px solid"}
        borderColor={"gray.300"}
        color={"black"}>
        {yearMap.map((year) => (
          <option
            key={year}
            value={year}
            style={{ color: "white", backgroundColor: "gray" }}>
            {year}
          </option>
        ))}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  );
};
export default YearSelect;
