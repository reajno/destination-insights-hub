import { useState, useEffect } from "react";
import { Input } from "@chakra-ui/react";

const DateSelect = ({ onDateChange }) => {
  const [date, setDate] = useState("");

  useEffect(() => {
    onDateChange(date);
    // Call the onDateChange callback whenever the date changes
    //
    // In parent component, you can use it like this:
    // const [date,setDate] = useState("");
    // <DateSelect onDateChange={setDate}/>
    //
    // This will update the date in the parent component whenever it changes
    // Then use date value from parent component in the fetch request
  }, [date]);

  return (
    <Input
      w={40}
      type="date"
      name="datepicker"
      id="datepicker"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      border={"2px solid"}
      borderColor={"gray.300"}
      color="black"
    />
  );
};
export default DateSelect;
