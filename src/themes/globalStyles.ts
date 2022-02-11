import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }

  .node-name {
    :hover {
      background-color: #f3f3f3;
    }
  }

  .node-name-hovered {
    background-color: #f3f3f3;
  }
  button{
    background-color: transparent;
    border: none;
  }
`;

export default GlobalStyle;
