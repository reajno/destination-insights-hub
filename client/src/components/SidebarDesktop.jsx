import { Box } from "@chakra-ui/react";
import SidebarContent from "./SidebarContent";

const SidebarDesktop = ({ ...props }) => {
  return (
    <Box alignSelf="stretch" w={"250px"}>
      <SidebarContent {...props} />
    </Box>
  );
};
export default SidebarDesktop;
