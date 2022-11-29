import styled from "styled-components"



export const Container = styled.div`
    display:flex;
    .search__container{
        max-width:250px;
        width:100%;
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
            z-index:10;
            bottom:0;
            transform:translateY(100%);
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