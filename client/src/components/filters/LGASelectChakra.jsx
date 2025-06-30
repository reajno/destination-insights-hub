import { useState, useEffect } from "react";
import { lgaMap } from "@/utils/maps";
import { NativeSelect } from "@chakra-ui/react";

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
    <NativeSelect.Root w={"100px"}>
      <NativeSelect.Field
        value={lgaName}
        onChange={(e) => setLgaName(e.target.value)}
        border={"2px solid"}
        borderColor={"gray.300"}
        color={"black"}
      >
        <option value="" disabled>
          Choose Option
        </option>
        {Object.keys(lgaMap).map((lga) => (
          <option
            key={lga}
            value={lga}
            style={{ color: "white", backgroundColor: "gray" }}
          >
            {lga}
          </option>
        ))}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  );
};
export default LGASelect;
