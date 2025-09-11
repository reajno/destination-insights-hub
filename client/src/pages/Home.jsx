import { Box, Text, Spacer } from "@chakra-ui/react";
import Login from "../components/LoginForm";
import HeaderSpacer from "@/components/header/HeaderSpacer";
import MainContainer from "@/components/MainContainer";

const Home = () => {
  return (
    <>
      <HeaderSpacer />
      <MainContainer
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        px={6}
        py={10}>
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
          © {new Date().getFullYear()} <a href="https://github.com/reajno">AJ Reaño</a>
        </Text>
      </MainContainer>
    </>
  );
};

export default Home;
