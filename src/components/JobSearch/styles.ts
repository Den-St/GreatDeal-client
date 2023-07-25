import styled from "styled-components";

export const Container = styled.div`
    padding:10px 15px;
    background:#f9faf4;
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

export const FiltersContainer = styled.div<{$opened:boolean}>`
    display:flex;
    flex-wrap:wrap;
    height:${({$opened}) => $opened ? `150px` : 'unset'};
    border-bottom: 1px solid black;
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
`;

export const JobItemContainer = styled.div`
    width:100%;

`;