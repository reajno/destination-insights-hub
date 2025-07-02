import { Flex, Button, Box } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";

const SidebarContent = ({ isMobile }) => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    await logout();
  };

  const handleExportPDF = async () => {
    const element = document.getElementById("dashboard-content");

    if (!element) {
      console.error("Dashboard content not found.");
      return;
    }

    try {
      // Convert dashboard content to PNG
      const dataUrl = await domtoimage.toPng(element);

      const img = new Image();
      img.src = dataUrl;

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      img.onload = () => {
        const pageWidth = pdf.internal.pageSize.getWidth();

        const ratio = img.width / img.height;
        const pdfWidth = pageWidth;
        const pdfHeight = pdfWidth / ratio;

        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("dashboard.pdf");
      };
    } catch (error) {
      console.error("PDF export failed:", error);
    }
  };

  return (
    <>
      <Flex
        gap={2}
        flexDirection="column"
        justifyContent="space-between"
        w={!isMobile ? "250px" : "100%"}
        h={!isMobile ? "calc(100vh - 5rem)" : "100%"}
        position={!isMobile ? "fixed" : "relative"}
        bg="gray.200"
        borderRight={!isMobile ? "2px solid" : null}
        borderColor="gray.300"
        px={6}
        py={12}
        style={{
          boxShadow: "inset -4px 0 8px -4px rgba(0, 0, 0, 0.1)",
        }}>
        {/* PRIMARY MENU */}
        <Flex gap={2} flexDirection="column">
          <Button
            as={Link}
            to="/dashboard"
            w="100%"
            variant={pathname === "/dashboard" ? "subtle" : "ghost"}
            justifyContent="flex-start"
            colorPalette="green"
            color={pathname === "/dashboard" ? "white" : "black"}
            _hover={{
              bg: "green.800",
              color: "white",
            }}>
            Dashboard
          </Button>

          {user?.role !== "Operator" ? (
            <Button
              as={Link}
              to="/dashboard/compare"
              w="100%"
              variant={pathname === "/dashboard/compare" ? "subtle" : "ghost"}
              justifyContent="flex-start"
              colorPalette="green"
              color={pathname === "/dashboard/compare" ? "white" : "black"}
              _hover={{
                bg: "green.800",
                color: "white",
              }}>
              Compare Regions
            </Button>
          ) : null}

          {user?.role === "Admin" ? (
            <Button
              as={Link}
              to="/dashboard/admin"
              w="100%"
              justifyContent="flex-start"
              colorPalette="green"
              variant={pathname === "/dashboard/admin" ? "subtle" : "ghost"}
              color={pathname === "/dashboard/admin" ? "white" : "black"}
              _hover={{
                bg: "green.800",
                color: "white",
              }}>
              Manage Users
            </Button>
          ) : null}
        </Flex>

        {/* SECONDARY MENU */}
        <Flex gap={2} flexDirection="column">
          <Button
            w="100%"
            justifyContent="flex-start"
            colorPalette="green"
            variant="ghost"
            color="black"
            _hover={{
              bg: "green.800",
              color: "white",
            }}
            onClick={handleExportPDF}>
            Export PDF
          </Button>
          {/* BOTTOM SEPARATOR */}
          <Box bg="black" w="100%" h={"2px"} />
          <Button
            w="100%"
            justifyContent="flex-start"
            colorPalette="red"
            variant="ghost"
            color="black"
            _hover={{
              bg: "red.500",
              color: "white",
            }}
            onClick={handleLogout}>
            Log Out
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
export default SidebarContent;
