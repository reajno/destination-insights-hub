import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Input,
  Text,
  Flex,
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";

const demoEmail = import.meta.env.VITE_DEMO_EMAIL;
const demoPass = import.meta.env.VITE_DEMO_PASS;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const performLogin = async (email, password) => {
    const isLoggedIn = await login(email, password);
    if (isLoggedIn) navigate("/dashboard", { replace: true });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    performLogin(email, password);
  };

  const handleDemo = async () => {
    performLogin(demoEmail, demoPass);
  };

  return (
    <Box
      bg="white"
      color="black"
      as="form"
      p={10}
      rounded="lg"
      boxShadow="md"
      w="full"
      maxW="md"
      onSubmit={handleLogin}>
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Sign in to your account
      </Heading>

      <Flex spacing={4} flexDirection="column">
        <Box w="100%">
          <Text fontSize="sm" mb={1}>
            Email address
          </Text>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </Box>

        <Box w="100%">
          <Text fontSize="sm" mb={1}>
            Password
          </Text>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </Box>
      </Flex>

      <ButtonGroup w={"100%"} mt={6} justifyContent={"center"}>
        <Button
          colorPalette={"yellow"}
          flex={1}
          variant={"subtle"}
          onClick={handleDemo}>
          Demo Mode
        </Button>
        <Button type="submit" colorPalette={"green"} flex={1}>
          Sign In
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default LoginForm;
