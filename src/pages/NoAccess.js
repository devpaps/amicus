import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Heading, Box } from "@chakra-ui/react";

const Unauthorized = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Amicus - Logga in</title>
      </Helmet>
      <Container>
        <Box p={[2, 4, 6, 8]}>
          <Heading as="h1" size="2xl">
            Du måste logga in
          </Heading>
        </Box>
      </Container>
    </>
  );
};

export default Unauthorized;
