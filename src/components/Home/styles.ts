import styled from "styled-components";

export const Container = styled.div`
    width:100%;
    height:90vh;
    .leaflet-container{
        height:90vh;
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
`;

