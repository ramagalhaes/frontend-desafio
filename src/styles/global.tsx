import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body{
        background-color: #252525;
        -webkit-font-smoothing: antialised;
    }

    body, input, button{
        font-size: 16px;
        font-family: helvetica;
    }

    button{
        cursor: pointer;
    }

    div{
      color: red;
    }
`;
