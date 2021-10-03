import React from "react";
import { Box, Text, Center } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Amicus - Om oss</title>
      </Helmet>
      <Center>
        <Box m={8}>
          <Text as="h1" fontSize="xl">
            Här ska stå något som jag inte riktigt vet ännu. Lär ju skriva något
            upplysande om min SPA. ☜(ﾟヮﾟ☜)
          </Text>
        </Box>
      </Center>
    </>
  );
};

export default About;
