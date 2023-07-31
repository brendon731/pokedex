import styled from "styled-components";

export const Card = styled.div`
/* border:1px solid green; */
    a{
        display:block;
        .card-img{
            display:flex;
            border:5px solid rgb(236, 236, 236);
            box-shadow:2px 2px 5px black, 2px 2px 10px black inset;
            border-radius:100%;
            width:130px;
            height:130px;

            background-size: 75%;
        }
        .card-img-waiting{
            height:130px;
        }
        img{
            width:90%;
            margin:auto;
        }
        .pokemon__name{
            text-align: center;
            text-transform: capitalize;
            margin:.3rem 0;
        }
    }

`