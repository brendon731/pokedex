import styled from "styled-components"

export const Card = styled.div`
    min-width:175px;
    flex:1;
    margin:.5rem;
    a{
        border-radius:10px;
        display:flex;
        flex-direction: column;
        width:100%;
        height:100%;
        padding:.7em;

        .card-img{
            display:flex;
            width:100%;
            /* border:1px solid black; */
            /* height:150px; */
            /* aspect-ratio: 1; */
        }
        .card-img-waiting{
            animation:2s entering;
            transition:1s;
            height:165px;
            /* background-color:black; */
        }
        img{
            width:100%;
            margin:auto;
            animation:entering 1s;

        }
        h4{
            font-size:18px;
            color:black;
            text-transform: capitalize;
            margin:.5rem auto;
        }
        @keyframes entering {
            0%{
                opacity:0;
            }
            100%{
                opacity:1;
            }
            
        }
}


`