import React from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Amicus - 404 Sidan ej hittad</title>
      </Helmet>
      <h1>404, sidan ej hittad</h1>
    </>
  );
};

export default NotFound;
