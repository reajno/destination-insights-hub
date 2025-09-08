import { useEffect, useState } from "react";
import { Grid, Text } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import DashboardCard from "./DashboardCard";

const serverURL = import.meta.env.VITE_SERVER_URL;

const YearlyMetricsCards = ({ lgaName, year, onFetchError, isCompare }) => {
  const { accessToken, isAuthLoading } = useAuth();
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch(
          `${serverURL}/api/data/metrics/${lgaName}/${year}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const json = await res.json();

        setMetrics(json[0]); // API returns array with one object
      } catch (error) {
        onFetchError(error);
      }
    };

    if (!isAuthLoading && lgaName && accessToken) fetchMetrics();
  }, [year, lgaName, accessToken, isAuthLoading]);

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
