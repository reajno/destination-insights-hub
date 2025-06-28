import { Flex, Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SidebarContent = ({ isMobile, pathname }) => {
  return (
    <>
      <Flex
        gap={2}
        flexDirection="column"
        justifyContent="space-between"
        w={"100%"}
        h={"100%"}
        bg="gray.200"
        borderRight={!isMobile ? "2px solid" : null}
        borderColor="gray.300"
        px={6}
        py={12}
        style={{
          boxShadow: "inset -4px 0 8px -4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* PRIMARY MENU */}
        <Flex gap={2} flexDirection="column">
          <Link to="/dashboard">
            <Button
              w="100%"
              variant={pathname === "/dashboard" ? "subtle" : "ghost"}
              justifyContent="flex-start"
              colorPalette="green"
              color={pathname === "/dashboard" ? "white" : "black"}
              _hover={{
                bg: "green.800",
                color: "white",
              }}
            >
              Dashboard
            </Button>
          </Link>

          <Link to="/dashboard/admin">
            <Button
              w="100%"
              justifyContent="flex-start"
              colorPalette="green"
              variant={pathname === "/dashboard/admin" ? "subtle" : "ghost"}
              color={pathname === "/dashboard/admin" ? "white" : "black"}
              _hover={{
                bg: "green.800",
                color: "white",
              }}
            >
              Admin
            </Button>
          </Link>
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
          >
            Export PDF
          </Button>
          {/* BOTTOM SEPARATOR */}
          <Box bg="white" w="100%" h={"2px"} />
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
          >
            Log Out
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
export default SidebarContent;
