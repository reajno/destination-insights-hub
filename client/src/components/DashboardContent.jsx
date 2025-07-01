import SpendBreakdownChart from "../components/charts/SpendBreakdownChart";
import SpendChart from "../components/charts/SpendChart";
import OccupancyADRChart from "../components/charts/OccupancyADRChart";
import YearlyMetricsCards from "../components/YearlyMetricsCards";
import { Box, Text, Flex, Grid, GridItem } from "@chakra-ui/react";
import DashboardCard from "@/components/DashboardCard";
import SummarySnapshotChart from "@/components/charts/SummarySnapshotChart";
import DateSelect from "./filters/DateSelect";
import { useState } from "react";
import useMicrotaskEffect from "../../hooks/useMicrotaskEffect";
import { toaster } from "./chakra-ui/toaster";
import ALOSChart from "./charts/ALOSChart";

const DashboardContent = ({ lgaName, year, isCompare = false }) => {
  const [date, setDate] = useState("");
  const [fetchError, setFetchError] = useState(null);

  useMicrotaskEffect(() => {
    if (fetchError) {
      toaster.create({
        description: fetchError.message,
        type: "error",
      });
    }
    setFetchError(null);
  }, [fetchError]);

  return (
    <Flex flexDirection="column" gap={4}>
      {/* METRICS SUMMARY */}
      <Box mb={4}>
        <Text as="h2" fontWeight="bold" fontSize="md" color={"black"} mb={4}>
          Key Metrics {isCompare && `- ${lgaName}`}
        </Text>
        <YearlyMetricsCards
          lgaName={lgaName}
          year={year}
          isCompare={isCompare}
          onFetchError={setFetchError}
        />
      </Box>

      {/* CHARTS */}
      <Grid
        w="100%"
        gap={4}
        templateColumns={{
          base: "1fr",
          lg: isCompare ? "1fr" : "repeat(4, 1fr)",
        }}>
        {" "}
        {/* YEAR SPEND  */}
        <GridItem colSpan={isCompare ? "4" : { base: 4, lg: 2 }}>
          <DashboardCard alignItems={"start"}>
            <Text as="h2" color="black" fontWeight="bold" mb={4}>
              Total Spend {isCompare && `- ${lgaName}`}
            </Text>
            <SpendChart
              lgaName={lgaName}
              year={year}
              onFetchError={setFetchError}
            />
          </DashboardCard>
        </GridItem>
        {/* TOP SPEND CATEGORIES */}
        <GridItem colSpan={isCompare ? "4" : { base: 4, lg: 2 }}>
          <DashboardCard alignItems={"start"}>
            <Text as="h2" color="black" fontWeight="bold" mb={4}>
              Top Spend Categories {isCompare && `- ${lgaName}`}
            </Text>
            <SpendBreakdownChart
              lgaName={lgaName}
              year={year}
              onFetchError={setFetchError}
            />
          </DashboardCard>
        </GridItem>
        {/* OCCUPANCY */}
        <GridItem colSpan={isCompare ? "4" : { base: 4, lg: 2 }}>
          <DashboardCard alignItems={"start"}>
            <Text as="h2" color="black" fontWeight="bold" mb={4}>
              Average Occupancy (AO) & Average Daily Rate (ADR){" "}
              {isCompare && `- ${lgaName}`}
            </Text>
            <OccupancyADRChart
              lgaName={lgaName}
              year={year}
              onFetchError={setFetchError}
            />
          </DashboardCard>
        </GridItem>
        {/* ALOS */}
        <GridItem colSpan={isCompare ? "4" : { base: 4, lg: 2 }}>
          <DashboardCard alignItems={"start"}>
            <Text as="h2" color="black" fontWeight="bold" mb={4}>
              Average Length of Stay (ALOS) & Average Booking Window (ABW){" "}
              {isCompare && `- ${lgaName}`}
            </Text>
            <ALOSChart
              lgaName={lgaName}
              year={year}
              onFetchError={setFetchError}
            />
          </DashboardCard>
        </GridItem>
        {/* SPEND SUMMARY */}
        <GridItem colSpan={4}>
          <DashboardCard alignItems={"start"}>
            <Flex w="100%" justifyContent="space-between">
              <Text as="h2" color="black" fontWeight="bold" mb={4}>
                Summary Snapshot {isCompare && `- ${lgaName}`}
              </Text>
              <DateSelect onDateChange={setDate} />
            </Flex>
            <SummarySnapshotChart
              lgaName={lgaName}
              date={date}
              onFetchError={setFetchError}
            />
          </DashboardCard>
        </GridItem>
      </Grid>
    </Flex>
  );
};
export default DashboardContent;
