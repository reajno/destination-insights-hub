import { Box, Flex, Text, Spacer } from "@chakra-ui/react";
import Login from "../components/LoginForm";
import NavSpacer from "@/components/nav/NavSpacer";
import MainContainer from "@/components/MainContainer";

const Home = () => {
  return (
    <>
      <NavSpacer />
      <MainContainer
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        px={6}
        py={10}
      >
        <Spacer />
        <Box textAlign="center">
          <Text as="h2" fontSize="md" color="gray.600">
            Tourism insights tailored for local councils, tourism analysts, and
            business operators.
          </Text>
          <Text as="h2" fontSize="md" color="gray.600" mb={16}>
            Track visitor occupancy, length of stay, spending habits, and more –
            all in one place.
          </Text>
        </Box>
        <Login />
        <Spacer />
        {/* FOOTER */}
        <Text fontSize="xs" color="gray.500" textAlign="center">
          Built for IFQ717 – Web Development Capstone (QUT)
        </Text>
      </MainContainer>
    </>
  );
};

export default Home;
