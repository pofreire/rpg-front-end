import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus{
    outline: 100%
  }

  html, body, #root{
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background: #282a36;
  }

  body, input, button{
    font: 14px 'Roboto', sans-serif;
  }

  a{
    text-decoration: none;
  }

  ul: {
    list-style: none;
  }

  button{
    cursor: pointer;
  }

  td, th{
    color: #fff;
    text-align: center;
  }

  .hidden-skill{
    display: none;
    opacity: 0;
  }

  .visible-skill{
    display: table-row;
    opacity: 1;
  }

  .form-search{
    width: 450px;
    input{
    background: transparent;
    color: #fff;
      :focus{
        background: #444;
        color: #fff;
        outline: none;
        box-shadow: none;
        border-color: #ff5555;
      }
    }
  }

  .media{
    align-items: center;
  }
  .media:not(:first-child){
    margin-top: 15px;
    border-top: 1px solid;
    padding-top: 10px;
  }
  .icon-rotate{
    transform: rotate(180deg);
    transition-duration: 1s;
  }

  .reset-rotate{
    transform: rotate(0);
    transition-duration: 1s;
  }

`;
