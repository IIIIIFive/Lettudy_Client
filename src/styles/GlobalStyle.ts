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
`;
