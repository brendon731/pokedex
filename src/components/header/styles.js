import styled from "styled-components";


export const Head = styled.div`
    position:relative;
    
    &:after{
        
        content:"";
        display:block;
        position:absolute;
        left:50%;
        top:50px;
        transform:translate(-50%);
        height:45px;
        width:45px;
        border:5px solid black;
        background-color:white;
        border-radius:50%;
        

    }
    .container{
        width:100%;
        max-width:960px;
        margin:auto;
        align-items:center;
        display:flex;
        justify-content: space-between;
        flex-wrap:wrap;
        .container__logo{
            height:50px;
            img{
                height:100%;
            }
        }
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
        min-height:5rem;
        align-items:center;
        display:flex;
        
    }
    .second_half{
         background-color:white;

    }
`