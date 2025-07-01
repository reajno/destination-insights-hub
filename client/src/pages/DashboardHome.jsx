import { useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import { lgaMap } from "../utils/maps";
import YearSelect from "@/components/filters/YearSelect";
import DashboardContent from "@/components/DashboardContent";

const DashboardHome = () => {
  const { user } = useAuth();
  const [year, setYear] = useState("");

  return (
    <>
      {/* HEADER */}
      <Flex
        bg="gray.50"
        position="fixed"
        w={{ base: "100%", md: "calc(100% - 250px)" }}
        p={6}
        zIndex={1}
        borderBottom="4px solid"
        borderColor="gray.300">
        {Object.keys(lgaMap)
          .filter((lga) => lga === user?.lga_name)
          .map((key) => (
            <Text
              key={key}
              as="h1"
              fontSize="2xl"
              fontWeight="bold"
              whiteSpace="nowrap"
              color="black"
              pr={6}>
              {lgaMap[key].label}
            </Text>
          ))}
        <YearSelect onYearChange={setYear} />
      </Flex>
      <Box h="92px" /> {/* Spacer */}
      <Flex
        p={6}
        gap={4}
        w="100%"
        flexDirection="column"
        id="dashboard-content">
        {year && user?.lga_name && (
          <DashboardContent lgaName={user.lga_name} year={year} />
        )}
      </Flex>
    </>
  );
};

export default DashboardHome;
