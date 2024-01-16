import styled from "styled-components";
import { Media } from "../../assets/breakpoints";

export const Container = styled.div`
    width:100%;
    height:90vh;
    ${Media.down.m}{
        height:100svh;
    }
    display:flex;
    flex-direction:column;
    padding:5px;
    box-sizing:border-box;
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
    .ant-empty-normal .ant-empty-description {
        color: white;
        font-size:25px;
    }
`;

export const UserInfoContainer = styled.div`
    display:flex;
    gap:5px;
    align-items:center;
`;

export const Avatar = styled.img`
`;

export const UserName = styled.p`
    margin:0;
`;

export const UserStatsContainer = styled.div`

`;


export const Reviews = styled.div`
    display:flex;
    flex-direction:column;
    gap:5px;
`;
export const Stat = styled.div``;
