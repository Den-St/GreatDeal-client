import { Button, Input } from "antd";
import { Display } from "../../assets/Display";
import { useDeposit } from "../../hooks/deposit";
import { LeavePage } from "../CreateJob/styles";
import {ArrowLeftOutlined} from "@ant-design/icons";
import { navRoutes,  } from "../../consts/routes";
import { useEffect } from "react";

export const Deposit = () => {
    const {onBuy,setSum,sum,loading,formRef,dataInputRef,signatureInputRef} = useDeposit();
    useEffect(() => {
        document.title = 'Deposit - GreatDeal';
    },[]);

    return <Display style={{flexDirection:'column',gap:'20px',width:'100%',height:'100vh',alignItems:'center','justifyContent':'center',background:'rgb(31,32,36)'}}>
        <Display style={{width:'100%',height:'30px',display:'flex',alignItems:'center',position:'absolute',top:'10px',justifyContent:'center'}}>
            <LeavePage to={navRoutes.myProfile.route} style={{position:'absolute',left:0}}><ArrowLeftOutlined/></LeavePage>
            <p style={{fontSize:'20px',color:'white'}}>Deposit</p>
        </Display>
        <Display style={{flexDirection:'column',gap:'20px',alignItems:'center','justifyContent':'center',}}>
            <Input style={{width:'150px'}} value={sum} onChange={(e) => setSum(+e.target.value)} placeholder={'Amount'} type={'number'}/>
            <Button onClick={onBuy} disabled={loading}>Deposit</Button>
            <form ref={formRef} method="POST" action="https://www.liqpay.ua/api/3/checkout" acceptCharset="utf-8">
                <input type="hidden" name="data" ref={dataInputRef}/>
                <input type="hidden" name="signature" ref={signatureInputRef}/>
                <input type={'submit'} style={{visibility:'hidden'}}/>
            </form>
        </Display>
    </Display>
}