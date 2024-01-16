import styled from "styled-components";
import { Media } from "./breakpoints";

export const Display = styled.div<{width?:string,height?:string,direction?:"column",position?:'relative' | 'absolute' | 'fixed',background?:string,fontSize?:string,maxHeight?:string,
                                   gap?:string,align?:'center' | 'start' | 'end',padding?:string,top?:string,bottom?:string,borderRadius?:string,margin?:string,maxWidth?:string,minWidth?:string,
                                   justify?:'center' | 'start' | 'end' | 'space-between' | 'space-around',left?:string,right?:string,color?:string,minHeight?:string}>`
    display:flex;
    box-sizing:border-box;
    font-family:helvetica;
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
    ${({borderRadius})=> borderRadius && `border-radius:${borderRadius};`}
    ${({color})=> color && `color:${color};`}
    ${({fontSize})=> fontSize && `font-size:${fontSize};`}
    ${({minHeight})=> minHeight && `min-height:${minHeight};`}
    ${({maxHeight})=> maxHeight && `max-height:${maxHeight};`}
    ${({maxWidth})=> maxWidth && `max-width:${maxWidth};`}
    ${({minWidth})=> minWidth && `min-width:${minWidth};`}
    ${Media.down.m}{
        ${({height}) => height && `height:${height.replace('vh','svh')};`}
    }
`;