import localisLogo from "../../assets/localis.png";
import { IoMenu } from "react-icons/io5";
import { Drawer, Portal, Image, IconButton } from "@chakra-ui/react";
import SidebarContent from "./SidebarContent";

const SidebarMobileDrawer = ({ ...props }) => {
  return (
    <>
      <Drawer.Root placement="start">
        <Drawer.Trigger asChild>
          <IconButton
            aria-label="asdsadda"
            position="fixed"
            variant={"ghost"}
            top="1.25rem"
            left="1.5rem"
            zIndex="overlay"
            h={"40px"}>
            <IoMenu />
          </IconButton>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner mt={"5rem"}>
            <Drawer.Content h="calc(100vh - 5rem)" w={"250px"}>
              <Drawer.Body p={0}>
                <SidebarContent {...props} />
              </Drawer.Body>
              <Drawer.Footer
                justifyContent="center"
                px={6}
                py={4}
                bg="green.700">
                <Image src={localisLogo} alt="Localis logo" h={6} />
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
};
export default SidebarMobileDrawer;
