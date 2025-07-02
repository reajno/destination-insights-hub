import { Flex, Text } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h={"100vh"}
      bg="green.800">
      <Text as={"h1"} fontSize={"3xl"}>
        404 Page Not Found :(
      </Text>
    </Flex>
  );
};
export default NotFound;
