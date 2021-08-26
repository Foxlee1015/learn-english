import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body{
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input,
  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
  h1, h2, h3, h4, h5, h6{
    font-family:'Maven Pro', sans-serif;
    font-weight: 700;
    line-height: 1.334;
    margin-bottom: 20px;
  }
  h1 {
    font-size : 50px;
  }
  h2 {
    font-size : 46px;
  }
  h3 {
    font-size : 42px;
  }
  h4 {
    font-size : 38px;
  }
  h5 {
    font-size : 34px;
  }
  h6 {
    font-size : 30px;
  }
  p {
    font-size : 18px;
    font-weight: 500;
    line-height: 1.334;
    margin-bottom: 15px;
  }
  span {
    font-size : 16px;
    font-weight: 300;
    line-height: 1.334;
    margin-bottom: 15px;
  }

  @media only screen and (max-width: 768px) {
    body {
      font-size: 12px;
    }
    h1, h2, h3, h4, h5, h6{
      margin-bottom: 15px;
    }
    h1 {
      font-size : 40px;
    }
    h2 {
      font-size : 36px;
    }
    h3 {
      font-size : 32px;
    }
    h4 {
      font-size : 28px;
    }
    h5 {
      font-size : 24px;
    }
    h6 {
      font-size : 20px;
    }
    p {
      font-size: 16px;
      margin-bottom: 12px;
    }
    span {
      font-size: 14px;
      margin-bottom: 12px;
    }
  }

  @media only screen and (max-width: 576px) {
    body {
      font-size: 10px;
    }
    h1, h2, h3, h4, h5, h6{
      margin-bottom: 12px;
    }
    h1 {
      font-size : 30px;
    }
    h2 {
      font-size : 27px;
    }
    h3 {
      font-size : 24px;
    }
    h4 {
      font-size : 21px;
    }
    h5 {
      font-size : 18px;
    }
    h6 {
      font-size : 15px;
    }
    p {
      font-size: 14px;
      margin-bottom: 8px;
    }
    span {
      font-size: 12px;
      margin-bottom: 8px;
    }
  }
`;

export default GlobalStyle;
