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
    :where(.css-dev-only-do-not-override-1m62vyb).ant-modal{
        background-color:rgb(47,48,53);
    }
    :where(.css-dev-only-do-not-override-1m62vyb).ant-modal .ant-modal-close{
        color:white;
    }
    :where(.css-dev-only-do-not-override-1m62vyb).ant-modal{
        padding:0;
    }
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
    gap:15px;
    padding:10px 0;
    overflow:scroll;
    height: 575px;
    width:100%;
    border-radius:5px;
    background:rgb(19,21,27)
`;

export const JobItemContainer = styled.div`
    width:100%;
    display:flex;
    gap:5px;
    padding:5px;
    box-sizing:border-box;
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