import {
  Flex,
  Image,
  AbsoluteCenter,
  Container,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import localisLogo from "/src/assets/localis.png";
import useAuth from "../../../hooks/useAuth";

const HeaderBar = () => {
  const { user, isAuthLoading } = useAuth();
  return (
    <>
      <Container
        as="header"
        w="full"
        fluid
        position="fixed"
        bg="green.700"
        px={6}
        py={6}
        h={20}
        zIndex={1}>
        <Flex justifyContent="space-between">
          <Link
            to="https://www.localis.co/"
            target="_blank"
            rel="noopener noreferrer">
            <Image
              src={localisLogo}
              alt="Localis logo"
              h={6}
              display="none"
              md={{ display: "inline" }}
            />
          </Link>

          {!isAuthLoading && user ? (
            <Flex
              flexDirection="column"
              display="none"
              md={{ display: "inline" }}>
              <Text as="p" textStyle="xs" fontWeight="bold" textAlign="end">
                {user.first_name + " " + user.last_name}
              </Text>
              <Text as="p" textStyle="xs" color="gray.300">
                {user.company} | {user.role}
              </Text>
            </Flex>
          ) : (
            <Spacer />
          )}
        </Flex>

        <AbsoluteCenter>
          <Text as="h1" textStyle={{ base: "lg", md: "xl" }}>
            Destination Insights Hub
          </Text>
        </AbsoluteCenter>
      </Container>
    </>
  );
};

export default HeaderBar;
