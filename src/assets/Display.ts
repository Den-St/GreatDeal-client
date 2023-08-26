import styled from "styled-components";

export const Display = styled.div<{width?:string,height?:string,direction?:"column",position?:'relative' | 'absolute',background?:string,
                                   gap?:string,align?:'center' | 'start' | 'end',padding?:string,top?:string,bottom?:string,borderRadius?:string,
                                   justify?:'center' | 'start' | 'end' | 'space-between' | 'space-around',left?:string,right?:string}>`
    display:flex;
    ${({width}) => width && `width:${width};`}
    ${({height}) => height && `height:${height};`}
    ${({direction}) => direction && `flex-direction:${direction};`}
    ${({gap}) => gap && `gap:${gap};`}
    ${({align}) => align && `align-items:${align};`}
    ${({justify}) => justify && `justify-content:${justify};`}
    ${({padding})=> padding && `padding:${padding};`}
    ${({position})=> position && `position:${position};`}
    ${({top})=> top && `top:${top};`}
    ${({bottom})=> bottom && `bottom:${bottom};`}
    ${({left})=> left && `left:${left};`}
    ${({right})=> right && `right:${right};`}
    ${({background})=> background && `background:${background};`}
    ${({borderRadius})=> borderRadius && `borderRadius:${borderRadius};`}

`;