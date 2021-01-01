import styled from 'styled-components';

import bgCadastro from '../../assets/bgCadastro.jpg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;

  img {
    width: 200px;
    height: 200;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    input {
      display: block;
      padding: 10px 20px;
      margin-bottom: 15px;
      background: transparent;
      border: none;
      border-bottom: solid 2px #fff;
      color: #fff;
      margin-left: auto;
      margin-right: auto;
    }

    h1 {
      color: #fff;
      margin-bottom: 10px;
      font-size: 28px;
      margin-top: 20px;
    }

    button {
      font-size: 20px;
      font-weight: bold;
      text-decoration: none;
      padding: 10px 50px;
      background: #fff;
      color: #252525;
      border: solid 2px #252525;
      border-radius: 50px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${bgCadastro}) no-repeat center center;
  background-size: cover;
`;

/* export const Form = styled.form`
    font-size: 18px;
    display: block;
    margin:0 100px;
`; */
