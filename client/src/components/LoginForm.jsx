import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, Input, Text, VStack } from "@chakra-ui/react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const isLoggedIn = await login(email, password);
    if (isLoggedIn) navigate("/dashboard", { replace: true });
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
      onSubmit={handleLogin}
    >
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Sign in to your account
      </Heading>

      <VStack spacing={4}>
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
      </VStack>

      <Button type="submit" colorPalette={"green"} mt={6} w="full">
        Sign In
      </Button>
    </Box>
  );
};

export default LoginForm;
