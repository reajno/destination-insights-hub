import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import SpendBreakdownChart from "../components/charts/SpendBreakdownChart";
import SpendChart from "../components/charts/SpendChart";
import OccupancyADRChart from "../components/charts/OccupancyChart";
import YearlyMetricsCards from "../components/YearlyMetricsCards";
import { Box, Text, Flex, Grid, GridItem } from "@chakra-ui/react";
import DashboardCard from "@/components/DashboardCard";
import ALOSChartA from "@/components/charts/ALOSChartA";
import SummarySnapshotChart from "@/components/charts/SummarySnapshotChart";

const DashboardContent = ({ lgaName, year }) => {
  return (
    <Flex flexDirection="column" gap={4}>
      {/* METRICS SUMMARY */}
      <Box mb={4}>
        <Text as="h2" fontWeight="bold" fontSize="md" color={"black"} mb={4}>
          Key Metrics
        </Text>
        <YearlyMetricsCards lgaName={lgaName} year={year} />
      </Box>

      {/* CHARTS */}
      <Grid
        gap={4}
        templateColumns={{
          base: "1fr",
          lg: "repeat(4, 1fr)",
        }}
      >
        {" "}
        {/* YEAR SPEND  */}
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <DashboardCard w={"100%"} alignItems={"start"}>
            <Text as="h2" color="black" fontWeight="bold" mb={4}>
              Total Spend
            </Text>
            <SpendChart lgaName={lgaName} year={year} />
          </DashboardCard>
        </GridItem>
        {/* TOP SPEND CATEGORIES */}
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <DashboardCard alignItems={"start"}>
            <Text as="h2" color="black" fontWeight="bold" mb={4}>
              Top Spend Categories
            </Text>
            <SpendBreakdownChart lgaName={lgaName} year={year} />
          </DashboardCard>
        </GridItem>
        {/* OCCUPANCY */}
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <DashboardCard w={"100%"} alignItems={"start"}>
            <Text as="h2" color="black" fontWeight="bold" mb={4}>
              Average Occupancy (AO) & Average Daily Rate (ADR)
            </Text>
            <OccupancyADRChart lgaName={lgaName} year={year} />
          </DashboardCard>
        </GridItem>
        {/* ALOS */}
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <DashboardCard w={"100%"} alignItems={"start"}>
            <Text as="h2" color="black" fontWeight="bold" mb={4}>
              Average Length of Stay (ALOS) & Average Booking Window (ABW)
            </Text>
            <ALOSChartA lgaName={lgaName} year={year} />
          </DashboardCard>
        </GridItem>
        {/* SPEND SUMMARY */}
        <GridItem colSpan={{ base: 1, lg: 4 }}>
          <DashboardCard w={"100%"} alignItems={"start"}>
            <Text as="h2" color="black" fontWeight="bold" mb={4}>
              Summary Snapshot
            </Text>
            <SummarySnapshotChart lgaName={lgaName} />
          </DashboardCard>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default DashboardContent;
