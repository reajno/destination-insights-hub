import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { toaster } from "@/components/chakra-ui/toaster";
import useMicrotaskEffect from "../../hooks/useMicrotaskEffect";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useAuth();
  const navigate = useNavigate();

  useMicrotaskEffect(() => {
    if (error) {
      toaster.create({
        description: error.message,
        type: "error",
      });
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const isLoggedIn = await login(email, password);
    if (isLoggedIn) navigate("/dashboard", { replace: true });
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="#F7F9FB" px={4}>
      <Box
        as="form"
        bg="white"
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

        <Button
          type="submit"
          bg="#FFD500"
          color="black"
          mt={6}
          w="full"
          _hover={{ opacity: 0.9 }}
        >
          Sign In
        </Button>
      </Box>
    </Flex>
  );
};

export default Login;