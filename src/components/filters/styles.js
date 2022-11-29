import  styled from "styled-components"

export const Filter = styled.div`
    position:relative;
    display:inline-block;
    button{

        background-color: white;
        border:2px solid grey;
        padding:.5rem;
        border-radius: 3px;
        color:grey;
        display:flex;
        font-size: 16px;
        align-items: center;

        &:hover, &:focus{
            filter:grayscale(5);
            background-color:rgb(185,185,185, .3);
        }

        svg{
            margin-left:.3rem;
           
        }
       

    }
    ul{
        position:absolute;
        background-color: rgb(185, 185, 185);
        width:fit-content;
        min-width:100%;
        li{
            padding:.5rem;

            &:hover{
                cursor:pointer;
                background-color: black;
                color:white;
            }
        }
    }
`
