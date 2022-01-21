import * as React from 'react';
import ControlledTimeElapsed from './ControlledTimeElapsed';
import BlackButton from './ultility/BlackButton';
import Input from './ultility/Input';

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
    countdownToggle:boolean;
    setCountdownToggle:React.Dispatch<React.SetStateAction<boolean>>;
    countdownDuration:number;
    setCountdownDuration:React.Dispatch<React.SetStateAction<number>>
    _preCountdown:React.MutableRefObject<number>
}

const Score: React.FC<ScoreProps> = ({loading,ended,answerShown,totalPoints,points,autoTimer,setAutoTimer,swapped,t,setT,countdownToggle,setCountdownToggle,countdownDuration,setCountdownDuration,_preCountdown}) => {
    const [hideSetting,setHideSetting]=React.useState(true)
    const [duration, setDuration] = React.useState(countdownDuration?countdownDuration.toString():'10');
    React.useEffect(()=>{
        let num=parseInt(duration)
        setCountdownDuration(num?num:10)
    },[duration])
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
    <span>{swapped?"[Practice Mode]":"[Normal Mode]"}</span>
    <ControlledTimeElapsed t={t} setT={setT}/>
    {!hideSetting&&<>
    <BlackButton triggered={autoTimer} setTriggered={setAutoTimer}>{autoTimer?"Auto Next Question":"Manual Next Question"}</BlackButton>
    <BlackButton triggered={countdownToggle} setTriggered={setCountdownToggle} >{countdownToggle?`QuizTimer ${countdownDuration}s`:"QuizTimer Off"}</BlackButton>
    <Input value={duration} setValue={setDuration} >Countdown Duration</Input>
    </>
    }
    <BlackButton  triggered={hideSetting} setTriggered={setHideSetting} >{hideSetting?"=":"x"}</BlackButton>
 </div>

 </div>
}
};

export default Score;
