import styled from "styled-components"



export const Container = styled.div`
    width:200px;
    position:relative;
    .search__container{
        display:flex;
    }
    ul{
        width:100%;
        height:250px;
        overflow-y:scroll;
        position:absolute;
        border:1px solid black;
        background-color: white;

    }


`
export const List = styled.ul`
    width:100%;
    height:250px;
    overflow-y:scroll;
`