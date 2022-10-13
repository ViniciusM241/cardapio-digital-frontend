import React from "react";

import { Container } from "./styles";

function Box({ children, ...props }) {
  return (
    <Container {...props}>
      {children}
    </Container>
  );
}

export default Box;
