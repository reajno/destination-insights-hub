import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { lgaMap } from "../utils/maps";
import SpendBreakdownChart from "../components/charts/SpendBreakdownChart";
import TestChart from "../components/charts/SpendChart";
import OccupancyADRChart from "../components/charts/OccupancyChart";
import YearlyMetricsCards from "../components/YearlyMetricsCards";
import ExportButton from "../components/ExportButton";
import NavSpacer from "@/components/nav/NavSpacer";
import Container from "@/components/MainContainer";
import {
  Box,
  Text,
  Flex,
  useBreakpointValue,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import SidebarDesktop from "@/components/sidebar/SidebarDesktop";
import SidebarMobileDrawer from "@/components/sidebar/SidebarMobileDrawer";
import YearSelect from "@/components/filters/YearSelect";
import DashboardCard from "@/components/DashboardCard";
import ALOSChartA from "@/components/charts/ALOSChartA";
import SummarySnapshotChart from "@/components/charts/SummarySnapshotChart";
import DashboardContent from "./DashboardContent";
import LGASelect from "@/components/filters/LGASelectChakra";

const DashboardAnalyst = () => {
  const { user, isAuthLoading } = useAuth();
  const [yearA, setYearA] = useState("");
  const [yearB, setYearB] = useState("");
  const [lgaNameA, setLgaNameA] = useState(user?.lga_name);
  const [lgaNameB, setLgaNameB] = useState("");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      {/* DASHBOARD CONTAINER*/}
      {!isAuthLoading && (
        // TODO: Fix pathname - its an object not a string so it will alway equal false.
        // Need to conditional render LGASelect component if compare page is active
        // {pathname === '/dashboard/compare' && (
        //   <LGASelect onLGAChange={lgaNameA}/>
        // <YearSelect onYearChange={setYearA} />
        // )}
        <Flex p={6} gap={4} w="100%">
          {/* HEADING: LGA + YEAR */}
          <Flex>
            <LGASelect onLGAChange={setLgaNameA} />
            <YearSelect onYearChange={setYearA} />
          </Flex>
          <Flex>
            <LGASelect onLGAChange={setLgaNameB} />
            <YearSelect onYearChange={setYearB} />
          </Flex>

          {/* DASHBOARD A*/}
          {yearA && lgaNameA && (
            <DashboardContent lgaName={lgaNameA} year={yearA} />
          )}

          {!lgaNameB ? (
            <div>Select LGA and year</div>
          ) : (
            <DashboardContent lgaName={lgaNameB} year={yearB} />
          )}

          {/* {yearB && lgaNameB && (
            <DashboardContent lgaName={lgaNameB} year={yearB} />
          )} */}
        </Flex>
      )}
    </>
  );
};

export default DashboardAnalyst;
