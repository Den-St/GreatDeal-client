import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    padding:10px 0px;
    box-sizing:border-box;
    background:rgb(32,32,36);
    height: 90vh;
    color:white;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:15px;
`;

export const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:7px;
    .select{
        width:100%;
    }
`;

export const FiltersContainer = styled.div`
    display:flex;
    flex-wrap:wrap;
    border-bottom: 1px solid black;
    padding:10px 0;
    box-sizing:border-box;
    overflow:hidden;
`;

export const OpenFiltersButton = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:20px;
    &hover:{
        opacity:0.9;
    }
`;

export const JobsContainer = styled.div`
    display:flex;
    flex-direction:column;
    gap:5px;
    overflow:scroll;
    height: 275px;
    width:100%;
    border-radius:5px;
    background:rgb(19,21,27)
`;

export const JobItemContainer = styled.div`
    width:100%;
    display:flex;
    gap:5px;
`;
export const CategoryIcon = styled.img`
    width:30px;
    height:30px;
`;

export const JobTitle = styled(Link)`
    text-decoration:none;
    color:white;
    width:80%;
`;

export const JobReward = styled.span`
    
`;