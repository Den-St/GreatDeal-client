import styled from "styled-components";
import { Media } from "../../assets/breakpoints";

export const Container = styled.div`
    width:100%;
    .leaflet-container{
        height:90vh;
    }
    ${Media.down.m}{
        height: 84%;
    }
    .leaflet-container a{
        color:white;
        -webkit-tap-highlight-color:transparent !important;
    }
    .leaflet-container a:active{
        background:transparent !important;
        color:white !important;
    }
    .leaflet-container a::hover{
        background:transparent !important;
        color:white !important;
    }
    .leaflet-fade-anim .leaflet-popup {
        transition: none;
    }
    .leaflet-bottom{
        display:none;
    }
    .leaflet-layer,
    .leaflet-control-attribution {
        filter: invert(100%) hue-rotate(180deg) brightness(100%) contrast(80%);
    }
    .leaflet-control-zoom-in,
    .leaflet-control-zoom-out{
        background:black;
    }
    .leaflet-popup ,.leaflet-popup-content-wrapper ,.leaflet-popup-tip ,.leaflet-control-zoom{
        background:rgb(47,48,53);
        color:white;
    }
`;

