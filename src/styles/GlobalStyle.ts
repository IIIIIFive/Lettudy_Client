import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import '@public/assets/font/font.css';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    width: 100vw;
    height: 100vh;
    font-family: 'Noto Sans KR';
    background-color: #F5F5F5;
    overflow-x: hidden;
  }

  * {
    box-sizing: border-box;
  }

  ol, ul {
    list-style: none;
  }
     
  button {
    border: none;
    cursor: pointer;
  }

  h1, h2, h3, h4, h5 {
    color: #595959;
    font-weight: 700;
  }

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 22px;
  }

  h3 {
    font-size: 20px;
  }

  h4 {
    font-size: 18px;
  }

  h5 {
    font-size: 16px;
    font-weight: 600;
  }
  
  h6 {
    font-size: 14px;
    font-weight: 600;
  }
`;
