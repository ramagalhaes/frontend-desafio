import styled from 'styled-components';

export const HeaderContainer = styled.div`
  widht: 100%;
  heigth: 10vh;
  margin-top: 2vh;
  background: #252525;
  align-items: stretch;
`;

export const Header = styled.div`
  max-width: 962px;
  heigth: 10vh;
  margin: 0 auto;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 60px;

  a {
    text-decoration: none;
    color: #fff;
    margin-right: 40px;
    padding: 20px 10px;
  }
`;

export const Container = styled.div`
  max-width: 962px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const ClientList = styled.div`
  background-color: #252525;
  border: 3px solid #ccc;
  border-radius: 5px;
  width: 500px;
  margin: 0 auto;
  margin-bottom: 20px;

  h3 {
    margin: 20px 0 10px 160px;
    color: #fff;
  }
  p {
    margin: 10px;
    color: #fff;
  }

  p::after {
    content: '';
    width: 100%;
    height: 1px;
    background-color: #ccc;
    display: block;
    margin-top: 3px;
  }

  button {
    width: 80px;
    margin-left: 105px;
    margin-bottom: 10px;
    border: solid 2px #db1e0d;
    color: #db1e0d;
    background: #252525;
    font-weight: bold;
    padding: 5px 0;
    border-radius: 10px;

    & + button{
      color: #57DB59;
      border: #57DB59 2px solid;
    }
  }


  span{
    display: flex:
    flex-direction: row;
`;
