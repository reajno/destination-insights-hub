import { Flex } from "@chakra-ui/react";

const MainContainer = ({ children, ...props }) => {
  return (
    <Flex minH="calc(100vh - 5rem)" bg={"gray.50"} {...props}>
      {children}
    </Flex>
  );
};
export default MainContainer;
