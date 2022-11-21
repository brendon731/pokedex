import styled from "styled-components"

export const Card = styled.div`
    width:175px;
    margin:1rem;
    a{
        border-radius:10px;
        display:flex;
        flex-direction: column;
        width:100%;
        height:100%;
        padding:.3rem .7em;

        .card-img{
            display:flex;
            width:100%;
        }
        .card-img-waiting{
            animation:2s entering;
            transition:1s;
        }
        img{
            width:100%;
            margin:auto;

        }
        h4{
            font-size:18px;
            margin:.7rem auto;
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