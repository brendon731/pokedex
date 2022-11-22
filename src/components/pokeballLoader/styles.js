import styled, { keyframes } from "styled-components";

const rotacao = keyframes`
100%{
    transform:translate(-50%, -50%) rotate(360deg);
}
`
export const Pokeball = styled.div`
        border-radius:50%;
        overflow:hidden;
        margin:auto;
        height:100px;
        width:100px;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        border:5px solid black;
        position:absolute;
        animation:${rotacao} 1s infinite linear;
    &:after{
        content:"";
        display:block;
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        height:25px;
        width:25px;
        border-radius:50%;
        background-color:white;
        border:4px solid black;
    }
    div{
        height:46px;
        width:100px;
    }
    .red{
        border-bottom:3px solid black;
        background-color: red;
    }
    .white{
        border-top:3px solid black;
        background-color: white;

    }
`