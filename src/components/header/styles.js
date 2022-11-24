import styled from "styled-components";


export const Head = styled.div`
    .container{
        width:100%;
        max-width:960px;
        /* border:1px solid black; */
        margin:auto;
        display:flex;
    }
    
    .first_half{
        background-color:rgb(219, 50, 50);
        border-bottom:5px solid black;
        position:relative;
    }

    .first_half {

        span{

            height:50px;
            width:50px;
            line-height:45px;
            background-color:white;
            border:5px solid black;
            border-radius:100%;

            text-align: center;
            display:block;
            position:absolute;
            left:50%;
            bottom:0;
            transform:translate(-50%, calc(50% + 5px));
            z-index:10;
        }

    }
    .first_half, .second_half{
        height:50%;
        padding:15px;
    }
    .second_half{
         background-color:white;

    }
`