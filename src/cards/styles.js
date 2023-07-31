import styled, {keyframes} from "styled-components"

const onLoad = keyframes`

    0%{
        opacity:0;
    }
    100%{
        opacity:1;
    }
            
        
` 
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
            width:100%;
            min-height:160px;

            img{
            width:100%;
            margin:auto;
            animation:entering 1s;
            
        }

        }
        .card-loaded{
            /* background-color:red; */
            animation:1s ${onLoad};
         
        }
        .card-waiting{
            img{
                visibility:hidden;
            }
        }
        
        h4{
            font-size:18px;
            color:black;
            text-transform: capitalize;
            margin:.5rem auto;
        }
        
}


`