import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Box, Flex, Grid, Spacer } from "@chakra-ui/react";
import LGASelect from "@/components/filters/LGASelect";
import YearSelect from "@/components/filters/YearSelect";
import DashboardContent from "@/components/DashboardContent";

const DashboardCompare = () => {
  const { user } = useAuth();
  const [yearA, setYearA] = useState("");
  const [yearB, setYearB] = useState("");
  const [lgaNameA, setLgaNameA] = useState(user?.lga_name);
  const [lgaNameB, setLgaNameB] = useState("");

  return (
    <>
      {/* FIXED HEADER */}
      <Flex
        bg="gray.50"
        justifyContent="space-between"
        position="fixed"
        w={{ base: "100%", md: "calc(100% - 250px)" }}
        p={6}
        zIndex={1}
        borderBottom="4px solid"
        borderColor="gray.300">
        {/* HEADER - DASHBOARD A */}
        <Flex gap={4}>
          <LGASelect onLGAChange={setLgaNameA} />
          <YearSelect onYearChange={setYearA} />
        </Flex>
        <Spacer />
        {/* HEADER - DASHBOARD B */}
        <Flex gap={4}>
          <LGASelect onLGAChange={setLgaNameB} />
          <YearSelect onYearChange={setYearB} />
        </Flex>
        <Spacer />
      </Flex>

      <Box h="92px" />

      <Grid
        p={6}
        gap={4}
        w="100%"
        templateColumns="repeat(2, 1fr)"
        id="dashboard-content">
        {yearA && lgaNameA && (
          <DashboardContent lgaName={lgaNameA} year={yearA} isCompare={true} />
        )}

        {lgaNameB && (
          <DashboardContent lgaName={lgaNameB} year={yearB} isCompare={true} />
        )}
      </Grid>
    </>
  );
};

export default DashboardCompare;
