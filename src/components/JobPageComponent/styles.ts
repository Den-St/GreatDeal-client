import { Link } from "react-router-dom";
import styled from "styled-components";
import { Media } from "../../assets/breakpoints";

export const Container = styled.div`
    width: 100%;
    height:100vh;
    ${Media.down.m}{
        height:100svh;
    }
    gap:5px;
    display:flex;
    color:white;
    flex-direction:column;
    box-sizing:border-box;
    .leaflet-container{
        height:20vh;
        ${Media.down.m}{
            height:20svh;
        }
    }
    .leaflet-bottom {
        display:none;
    }
    .slick-list{
        background:#202024;
        opacity:0.9;
    }
   .ant-carousel{
        display:unset;
    }
    .leaflet-container{
        height:15vh;
        ${Media.down.m}{
            height:15svh;
        }
    }
    .leaflet-bottom {
        display:none;
    }
    .ant-image-img{
        width:160px;
        height:160px;
        object-fit:contain;
    }
    .slick-current{
        display:flex;
        justify-content:center;
        align-items:center;
        background:#202024;
        opacity:0.9;
    }
    .slick-active{
        display:flex;
        justify-content:center;
        align-items:center;
        background:#202024;
        opacity:0.9;
    }
    .slick-slide{
        display:flex;
        justify-content:center;
        align-items:center;
        background:#202024;
        opacity:0.9;
    }
    .ant-carousel .slick-initialized .slick-slide {
        display: flex;
    }
    .leaflet-container a{
        color:white;
    }
    .leaflet-fade-anim .leaflet-popup {
        transition: none;
    }
    .leaflet-bottom{
        display:none;
    }
    .leaflet-layer,
    .leaflet-control-attribution {
        filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
    }
    .leaflet-control-zoom-in,
    .leaflet-control-zoom-out{
        background:black;
    }
    .leaflet-popup ,.leaflet-popup-content-wrapper ,.leaflet-popup-tip ,.leaflet-control-zoom{
        background:rgb(47,48,53);
        color:white;
    }
    background:#202024;
`;

export const InfoContainer = styled.div`
    padding:5px;
    box-sizing:border-box;
    display:flex;
    flex-direction:column;
    gap:5px;
`;

export const Title = styled.p`
    margin:0;
`;

export const Description = styled.p`
    margin:0;
`;

export const Reward = styled.p`
    margin:0;
    font-size:20px;
`;

export const ApplyButton = styled.button<{$iscreator:boolean,$isalreadyhave:boolean}>`
    background: ${({$isalreadyhave,$iscreator}) => $iscreator ? 'grey' : $isalreadyhave ? 'red' : 'green'};
`;

export const CreatorContainer = styled.div`
    display:flex;
    gap:5px;
    align-items:center;
`;

export const Avatar = styled.img`
    width:40px;
    height:40px;
    object-fit:contain;
`;

export const CreatorName = styled(Link)`
    text-decoration:none;
    color:white;
`;

export const CreatorCreatedAt = styled.p``