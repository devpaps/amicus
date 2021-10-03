import React from "react";
import { Container } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <>
      <Container maxW="container.xl">{children}</Container>
    </>
  );
};

export default Layout;
