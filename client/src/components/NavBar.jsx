import { Box, Flex, Image, Spacer, Button } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import localisLogo from "/src/assets/localis.png";

const NavBar = () => {
  const { pathname } = useLocation();

  const isHomePage = pathname === "/";

  if (!isHomePage) return null; // Only show NavBar on Home

  return (
    <Flex
      bg="gray.800"
      color="white"
      px={6}
      py={4}
      align="center"
      boxShadow="sm"
    >
      <Image src={localisLogo} alt="Localis logo" h={6} mr={4} />
      <Spacer />
      <Flex gap={4}>
        <Link to="/login">
          <Button bg="white" color="black" _hover={{ opacity: 0.9 }} size="sm">
            Log In
          </Button>
        </Link>
        <Button
          as="a"
          href="https://www.localis.co/"
          target="_blank"
          rel="noopener noreferrer"
          bg="white"
          color="black"
          _hover={{ opacity: 0.9 }}
          size="sm"
        >
          Find Out More
        </Button>
      </Flex>
    </Flex>
  );
};

export default NavBar;
