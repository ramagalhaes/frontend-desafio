import styled from 'styled-components';

import bgHome from '../../assets/bgHome.jpg';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;

    img{
        width:200px;
        height:200;
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction:column;
    place-content: center;
    align-items:center;
    width:100%;
    max-width:700px;

    form{

        margin: 80px 0;
        width: 340px;
        text-align: center;

        h1{
            color:#FFF;
            margin-bottom:30px;
            font-size: 28px;
        }
        button{
            font-size: 20px;
            font-weight: bold;
            text-decoration: none;
            padding: 10px 50px;
            background: #FFF;
            color: #252525 ;
            border: solid 2px #252525;
            border-radius: 50px
            
        }
    }
`;

export const Background = styled.div`
    flex:1;
    background: url(${bgHome}) no-repeat center center;
    background-size: cover;
`;




/*export const Form = styled.form`
    font-size: 18px;
    display: block;
    margin:0 100px;
`;*/