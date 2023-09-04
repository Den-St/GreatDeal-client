import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const Container = styled.div`
    height:90vh;
    .ant-tabs-tab{
        margin-left:20px;
    }
    .anticon-star{
        color:gold;
    }
    background:rgb(32,32,36);
    color:white;
    :where(.css-dev-only-do-not-override-1m62vyb).ant-statistic .ant-statistic-title{
        color:white;
    }
    :where(.css-dev-only-do-not-override-1m62vyb).ant-statistic .ant-statistic-content{
        color:white;
    }
    :where(.css-dev-only-do-not-override-1m62vyb).ant-tabs{
        color:white;
    }
`;

export const ItemsContainer = styled.div`
    width: 100%;
    display:flex;
    flex-direction:column;
    overflow:scroll;
    padding: 0 5px;
    box-sizing:border-box;
    gap:5px;
    overflow:scroll;
    height:410px;
    color:white;
    .ant-empty-normal .ant-empty-description {
        color: white;
        font-size:25px;
    }
`;

export const Approved = styled.span`
    padding:5px;
    background:green;
    color:white;
    height:25px;
    text-align:center;
`;

export const Rejected = styled.span`
    padding: 5px;
    background:red;
`;

export const ItemContainer = styled.div`
    display:flex;
    gap:5px;
    box-sizing:border-box;
    background:#2f3035;
    padding:5px;
    
`;

export const ReviewText = styled.p`
    margin:0;
    width:100%;
    padding-left:40px;
    box-sizing:border-box;
`;

export const Rate = styled.div`
    display:flex;
    align-items:center;
    gap:3px;
    .anticon{
        color:gold;
    }
`;


export const JobTitle = styled(Link)`
    width:79%;
    text-decoration:none;
    color:white;
`;

export const JobReward = styled.p`
    margin:0;
`;

export const DirectoriesContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:space-around;
    border:1px solid black;
    box-sizing:border-box;
`;

export const Directory = styled.button`
    
`;

export const UserContainer = styled.div`
    padding:5px;
    display:flex;
    gap:7px;
    height:50px;
    align-items:center;
`;

export const UserName = styled.p`
    margin:0;
`;

export const EditNameButton = styled.button`
    border:1px solid black;
    border-radius:50%;
    height:30px;
`;

export const ReviewCreatorName = styled(Link)`
    text-decoration:none;
    color:white;
`; 

