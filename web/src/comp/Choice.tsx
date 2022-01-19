import React from "react";
import { PQuestion, PQuestionAnswer } from "./Progress";

export interface ChoiceProps{
    answer: PQuestionAnswer;
    answerShown:boolean;
    quesUpdate:React.MutableRefObject<PQuestion | undefined>;
    id:number;
    handleAnswerClick:Function
}

export const Choice:React.FC<ChoiceProps>=({answer,answerShown,quesUpdate,handleAnswerClick,id})=>{
    const [selected,setSelected]=React.useState(false);
    const [buttonColor,setButtonColor]=React.useState("blue");
    const setAnswerButtonColor=()=>{
        setButtonColor(selected?answer.correct?"green":"red":"#0249bd")
    }
    React.useEffect(()=>{
        setAnswerButtonColor()
    },[selected])
    React.useEffect(()=>{
        if(answerShown)
        {
            setSelected(true);
        } else {
            setSelected(false);
        }
    },[answerShown])
    return <li key={answer.val} className="AnswerBox">
    <button 
    disabled={selected}
    className='AnswerButton'
    style={{
        opacity:selected?0.5:0.8,
        backgroundColor:buttonColor
    }}
    onMouseEnter={()=>{setButtonColor("#002b70")}}
    onMouseLeave={()=>{setAnswerButtonColor()}}
    onClick={()=>{
        handleAnswerClick(selected,setSelected,answer,id)
        }}>
        {answer.val}
    </button>
    {selected?<span>{quesUpdate.current!.a[id].chosen}</span>:undefined}
    </li>
}