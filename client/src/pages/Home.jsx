import { Link } from "react-router-dom";
import { Box, Button, Flex, Image, Text, Heading, SimpleGrid } from "@chakra-ui/react";
import heroImage from "/src/assets/hero.jpg";

const Home = () => {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="#F7F9FB" px={6} py={10}>
      <Box maxW="5xl" w="100%" mx="auto" px={4}>
        {/* Top section */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} mb={16} alignItems="center">
          <Box>
            <Heading as="h1" size="xl" mb={4}>
              Destination Insight Hub
            </Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              Real-time tourism insights tailored for councils and tourism boards. Track occupancy, ADR, visitor spend and more – all in one place.
            </Text>
            <Flex gap={4}>
              <Link to="/login">
                <Button bg="#FFD500" color="black" _hover={{ opacity: 0.85 }} px={6}>
                  Log In
                </Button>
              </Link>
              <Button
                as="a"
                href="https://www.localis.co/"
                target="_blank"
                rel="noopener noreferrer"
                bg="#D4FF65"
                color="black"
                _hover={{ opacity: 0.85 }}
                px={6}
              >
                Find Out More
              </Button>
            </Flex>
          </Box>
          <Image
            src={heroImage}
            alt="Queensland tourism destination"
            rounded="2xl"
            shadow="md"
            objectFit="cover"
            w="100%"
            h="auto"
          />
        </SimpleGrid>

        {/* Highlights */}
        <Box>
  <Flex justify="center" gap={6} mb={4} wrap="wrap">
    <Box
      bg="gray.200"
      p={4}
      rounded="md"
      shadow="sm"
      fontSize="sm"
      color="gray.800"
      maxW="480px"
      w="100%"
    >
      Live dashboards to track occupancy, ADR and spend across your region.
    </Box>
    <Box
      bg="gray.200"
      p={4}
      rounded="md"
      shadow="sm"
      fontSize="sm"
      color="gray.800"
      maxW="480px"
      w="100%"
    >
      Compare data between councils, LGAs or tourism zones.
    </Box>
  </Flex>

  <Flex justify="center" gap={6} wrap="wrap">
    <Box
      bg="gray.200"
      p={4}
      rounded="md"
      shadow="sm"
      fontSize="sm"
      color="gray.800"
      maxW="480px"
      w="100%"
    >
      Export visual insights for grant proposals and strategy workshops.
    </Box>
    <Box
      bg="gray.200"
      p={4}
      rounded="md"
      shadow="sm"
      fontSize="sm"
      color="gray.800"
      maxW="480px"
      w="100%"
    >
      Secure role-based login for local government and tourism partners.
    </Box>
  </Flex>
</Box>



        {/* Footer */}
        <Text fontSize="xs" color="gray.500" textAlign="center" mt={20}>
          Built for IFQ717 – Web Development Capstone (QUT)
        </Text>
      </Box>
    </Flex>
  );
};

export default Home;