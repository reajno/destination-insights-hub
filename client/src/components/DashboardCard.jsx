import { Flex } from "@chakra-ui/react";

const DashboardCard = ({ children, ...props }) => {
  return (
    <Flex
      bg="white"
      p={4}
      w={"100%"}
      rounded="md"
      boxShadow="md"
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      {...props}>
      {children}
    </Flex>
  );
};
export default DashboardCard;
