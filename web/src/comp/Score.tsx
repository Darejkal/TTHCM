import * as React from 'react';
import ControlledTimeElapsed from './ControlledTimeElapsed';

interface ScoreProps {
    loading:boolean;
    ended:boolean;
    answerShown:boolean;
    totalPoints:number;
    points:number;
    autoTimer:boolean;
    setAutoTimer:React.Dispatch<React.SetStateAction<boolean>>;
    swapped:boolean;
    t:number;
    setT:React.Dispatch<React.SetStateAction<number>>;
}

const Score: React.FC<ScoreProps> = ({loading,ended,answerShown,totalPoints,points,autoTimer,setAutoTimer,swapped,t,setT}) => {
    const [buttonColor,setButtonColor]=React.useState<string>("black")
    const [buttonColorText,setButtonColorText]=React.useState<string>("black")
    const buttonColorByAutoTimer=()=>{
        if(autoTimer){
            setButtonColor("black")
            setButtonColorText("white")
        } else {
            setButtonColor("white")
            setButtonColorText("black")
        }
    }
    React.useEffect(()=>{
        buttonColorByAutoTimer()
    },[autoTimer])
    if(loading) 
    return <div className="Score"><span>Loading</span></div>
else {
    return ended?
    <div className="Score"><span>Quiz ended. Press the continue button to continue</span></div>
    :
    <div><div className="Score">
<div>
    <span>{"Current Points: "+ points +(answerShown?"/"+totalPoints:"")}</span>
    </div>
    <ControlledTimeElapsed t={t} setT={setT}/>
    <span>{swapped?"[Practice Mode]":"[Normal Mode]"}</span>
    <button 
    className='ToggleTimer' 
    style={{
        backgroundColor:buttonColor,
        color:buttonColorText
    }}
    onMouseEnter={()=>{buttonColor=="black"?setButtonColor("#1f1f1f"):setButtonColor("#d4d5d6")}}
    onMouseLeave={()=>{buttonColorByAutoTimer()}}
    onClick={()=>{setAutoTimer(!autoTimer)}}
    >{"Auto Next Question : "+(autoTimer?"On":"Off")}</button>
 </div>

 </div>
}
};

export default Score;
