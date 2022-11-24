import styled from "styled-components"



export const Container = styled.div`
    display:flex;
    .search__container{
        width:250px;
        position:relative;

        input{
            width:100%;
            padding:.3rem;
            box-sizing: border-box;
            border:none;
            &:focus ~ .search__list{
                display:block;
            }
        }
        .search__list{
            display:none;
            width:calc(100%);
            height:250px;
            overflow-y:scroll;
            top:25px;
            position:absolute;
            background-color: white;
            li{

                padding:.5rem;
                &:hover{
                    background-color:grey;
                    cursor:pointer;
                    
                }
            }
        }
    }
    button{
        border:none;
    }
    
   
   


`
export const List = styled.ul`
    /* width:100%;
    height:250px;
    overflow-y:scroll; */
`