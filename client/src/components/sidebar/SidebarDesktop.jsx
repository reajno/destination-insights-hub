import { Box } from "@chakra-ui/react";
import SidebarContent from "./SidebarContent";

const SidebarDesktop = ({ ...props }) => {
  return (
    <>
      <Box minW={"250px"} zIndex={0}></Box>
      <SidebarContent {...props} />
    </>
  );
};
export default SidebarDesktop;
