import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import App from "./App";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
    font-size: 10px;
    font-family: "NotoSansCJKKr-Regular";
  }
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    width: 100%;
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
  }
  .ir {
    position: absolute;
    clip: rect(0,0,0,0);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow:hidden;
  }
  .hide {
    display: none;
  }
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle />
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
