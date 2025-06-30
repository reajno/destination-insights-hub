import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Grid, Box, Text, Flex } from "@chakra-ui/react";
import DashboardCard from "./DashboardCard";

const YearlyMetricsCards = ({ lgaName, year, isCompare }) => {
  const { accessToken } = useAuth();
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/data/metrics/${lgaName}/${year}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const json = await res.json();
        setMetrics(json[0]); // API returns array with one object
      } catch (err) {
        console.error("Error fetching metrics summary:", err);
      }
    };

    if (lgaName && accessToken) fetchMetrics();
  }, [lgaName, year, accessToken]);

  if (!metrics) return null;

  return (
    <Grid
      templateColumns={
        isCompare
          ? "repeat(2, 1fr)"
          : {
              base: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }
      }
      gap={4}>
      <DashboardCard>
        <Text fontSize="sm" color="gray.500" textAlign="center">
          Total Spend
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="blue.500">
          {"$" + Number(metrics.spend).toLocaleString()}
        </Text>
      </DashboardCard>

      <DashboardCard>
        <Text fontSize="sm" color="gray.500" textAlign="center">
          Occupancy Rate
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="green.500">
          {(metrics.occupancy * 100).toFixed(1)}%
        </Text>
      </DashboardCard>

      <DashboardCard>
        <Text fontSize="sm" color="gray.500" textAlign="center">
          Average Daily Rate (ADR)
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="orange.500">
          {"$" + Number(metrics.adr).toFixed(2)}
        </Text>
      </DashboardCard>

      <DashboardCard>
        <Text fontSize="sm" color="gray.500" textAlign="center">
          Average Length of Stay (ALOS)
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="purple.500">
          {Number(metrics.alos).toFixed(2)} days
        </Text>
      </DashboardCard>
    </Grid>
  );
};

export default YearlyMetricsCards;
