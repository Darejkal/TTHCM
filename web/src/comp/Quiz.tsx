import * as React from 'react';
import '../App.css';
import {default as tthcm} from '../assets/tthcm';
import {default as qsc} from '../assets/qsc';
import {default as dlan} from '../assets/dlan';
import BottomNav from './BottomNav';
import { Choice } from './Choice';
import PercentageBar from './PercentageBar';
import {  originalPoll, PData, PQuestion, PQuestionAnswer, _updateProgress } from './Progress';
import Score from './Score';
import { arrShuffle, fDownload, fOpen, yyyymmdd } from './_Functions';
import * as correctIMG from "../img/100/Img100"
import * as falseIMG from "../img/you_dumb/ImgYouDumb"
import BlackButton from './ultility/BlackButton';
interface QuizProps {
}
// const correctImg = [require("../img/100/0.png"), require("../img/100/1.png"), require("../img/100/2.png"), require("../img/100/3.png"), require("../img/100/4.png"), require("../img/100/5.png"), require("../img/100/6.png"), require("../img/100/7.png"), require("../img/100/8.png"), require("../img/100/9.png")];
// const falseImg = [require("../img/you_dumb/0.png"), require("../img/you_dumb/1.png"), require("../img/you_dumb/2.png"), require("../img/you_dumb/3.png"), require("../img/you_dumb/4.png"), require("../img/you_dumb/5.png"), require("../img/you_dumb/6.png"), require("../img/you_dumb/7.png"), require("../img/you_dumb/8.png"), require("../img/you_dumb/9.png")];
let defaultData=tthcm
let defaultPoll={poll:arrShuffle(defaultData.poll),pollID:defaultData.pollID?defaultData.pollID:0}
let defaultName='tthcm'
let _choices={tthcm:tthcm,qsc:qsc,dlan:dlan}
const correctImg=Object.values(correctIMG)
const falseImg=Object.values(falseIMG)
const Quiz: React.FC<QuizProps> = () => {
    const [dtName,setDtName]=React.useState(defaultName)
    const dt=React.useRef<PData>(defaultPoll)
    const [loading,setLoading]=React.useState(true);
    const [ID,setID]=React.useState(0);
    const [ques,setQues]=React.useState<PQuestion>();
    const [ended,setEnded]=React.useState(false);
    const [points,setPoints]=React.useState(0)
    const [t,setT]=React.useState(0)
    const needToAnswer=React.useRef(0)
    const [answerShown,setAnswerShown]=React.useState(false)
    const [autoTimer,setAutoTimer]=React.useState(true)
    const [totalPoints,setTotalPoints]=React.useState(0)
    const wrongQuestionDT=React.useRef<PQuestion[]>([])
    const [swapped,setSwapped]=React.useState(false);
    const wrongAdded=React.useRef(false)
    const backupDT=React.useRef<PQuestion[]>([])
    const currentID=React.useRef<number>(0)
    const _random=React.useRef<number>(0)
    const _exported=React.useRef(false);
    const [countdownToggle,setCountdownToggle]=React.useState(false);
    const _preCountdown=React.useRef(0)
    const [countdownDuration,setCountdownDuration]=React.useState(10)
    const [countdown,setCountdown]=React.useState(false);
    // console.log(JSON.stringify(dt.current))
    const prepareAnswers=()=>{
        if(!dt.current.poll[ID]) {
            setEnded(true)
            return
        }
        dt.current.poll[ID].a=arrShuffle(dt.current.poll[ID].a)
        let points=0;
        for(var x of dt.current.poll[ID].a){
            if(x.correct) points++
        }
        needToAnswer.current=points;
        setTotalPoints(totalPoints+points)
        setQues({...dt.current.poll[ID]})
        startCountdown()
    }
    const startCountdown=()=>{
        setCountdown(true&&countdownToggle)
        _preCountdown.current=t
    }
    const handleAnswerClick=(selected:boolean,setSelected:React.Dispatch<React.SetStateAction<boolean>>,answer:PQuestionAnswer,id:number)=>{
        if(answer.correct==1) 
        {
            setPoints(points+1);
            answer.chosen++
        }
        else {
            setPoints(points-1)
            answer.chosen--
            if(!wrongAdded.current)
                {
                    wrongAdded.current=true;
                    wrongQuestionDT.current.push(ques!);
                }
        }
        setSelected(!selected);
        if(--needToAnswer.current<1){
            handleSubmit()
        } 
    }
    const interPackage=(p:number)=>{
        let _poll=[...dt.current.poll].sort(
            (a,b)=>a.id>b.id?1:a.id==b.id?0:-1
        ).map((v)=>{
                let _a =v.a.map((value)=>{
                return value.chosen?{
                    id:value.id,
                    c1: value.correct,
                    c2:value.chosen,
                    // id:undefined,
                    // val:undefined,
                }:undefined}).filter(val=>val!=undefined)
                if(_a.length==0) return undefined
                return {
                    id:v.id,
                    a:_a
                }
            // id:undefined,
            // q:undefined,
        }).filter(val=>val!=undefined)
        if(_poll.length!=0){
        //@ts-ignore
        _updateProgress({pollID:dt.current.pollID.toString(),poll:_poll},p,t)
        }
}
    const resetPoints=()=>{
        setPoints(0);
        setTotalPoints(0);
    }
    const restart =(index=0,newDataset:undefined|originalPoll=undefined,newDtName:undefined|string=undefined)=>{
        if(newDataset) dt.current={'poll':arrShuffle(newDataset.poll),'pollID':newDataset.pollID?newDataset.pollID:0}
        dt.current.poll=index==0?arrShuffle(dt.current.poll):dt.current.poll
        if(newDtName) setDtName(newDtName)
        setID(index)
        setEnded(false);
        setLoading(false);
        prepareAnswers()
        setTotalPoints(0)
        setPoints(0)
        wrongQuestionDT.current=[]
        backupDT.current=[]
    }
    const dtExport =()=>{
        fDownload(JSON.stringify({...dt.current,now:{wrongQuestionDT:wrongQuestionDT.current},id:ID}),"Quiz_export_"+yyyymmdd(new Date()),"application/json")
        if(!_exported.current) {
            interPackage((ID+1)/dt.current.poll.length)
            _exported.current=true
        }
    }
    const dtImport= ()=>{
        fOpen(".json", (evt)=>{
                //@ts-ignore
                var files = evt.target.files;
                if (!files|| files.length == 0) {
                    alert("Something wrong happened. Please try again. (Code : N0012)")
                    return;
                }
                var file = files[0];
                var reader = new FileReader();
                reader.onload = (e) =>{
                    if(typeof e?.target?.result =="string")
                        {
                            let temp= JSON.parse(e.target.result);
                            if(temp?.poll&&temp?.pollID&&temp.poll instanceof Array)
                            {
                                dt.current.poll=temp.poll
                                dt.current.pollID=temp.pollID
                                restart(temp?.now?.ID?temp.now.ID:0)
                            }
                            return
                        }
                    else {
                        alert("Something wrong happened. Please try again. (Code : N0012)")
                        return null
                    }
                }
                // Read in the image file as a data URL.
                reader.readAsText(file);
            }
        )
    }
    const swapDeck = ()=>{
        if(swapped){
            setLoading(true)
            let practiced=dt.current.poll.splice(0,ID)
            wrongQuestionDT.current=dt.current.poll
            practiced.forEach(((val)=>{
                var result=backupDT.current.findIndex((o)=>{
                    return o.id==val.id
                })
                if(result>-1)
                    backupDT.current[result]=val
            }))
            dt.current.poll=backupDT.current
            setID(currentID.current)
            // resetPoints()
            setLoading(false)
        }
        else{
            if(wrongQuestionDT.current.length==0){
                alert("You haven't made any mistakes yet. Nice.")
                return
            }
            backupDT.current=dt.current.poll
            dt.current.poll=arrShuffle(wrongQuestionDT.current)
            currentID.current=ID
            setID(0)
            // resetPoints()
        }
        setSwapped(x=>!x)
    }
    React.useEffect(()=>{
        prepareAnswers()
        setLoading(false)
    },[])
    React.useEffect(()=>{
        if(ID>=dt.current.poll.length) {
            setEnded(true);
            return;
        }
       prepareAnswers()
       setEnded(false)
    },[ID])
    React.useEffect(
        ()=>{
            if(answerShown&&autoTimer)
                setTimeout(()=>{handleSubmit()},3000)
            else if(!answerShown) _random.current=Math.floor(Math.random()*9.9)
        }
    ,[answerShown])
    const handleSubmit=()=>{
        if(answerShown){
            setID(ID+1)
            wrongAdded.current=false
        }
        setAnswerShown(!answerShown)
    }
    React.useEffect(()=>{
        if(countdown&&(t-_preCountdown.current>countdownDuration)){
            if(needToAnswer.current>0)
                {
                    if(!wrongAdded.current)
                    {
                        wrongAdded.current=true;
                        wrongQuestionDT.current.push(ques!);
                    }
                    setCountdown(false)
                    handleSubmit()
                }
        }
            
    },[t])
    React.useEffect(()=>{
        startCountdown()
    },[countdownToggle])
    return <div className='QuizPage'>
        <Score loading={loading} ended={ended} answerShown={answerShown} totalPoints={totalPoints} points={points} setAutoTimer={setAutoTimer} autoTimer={autoTimer} swapped={swapped} t={t} setT={setT} countdownToggle={countdownToggle} setCountdownToggle={setCountdownToggle} countdownDuration={countdownDuration} setCountdownDuration={setCountdownDuration} _preCountdown={_preCountdown}/>
            {!loading&&<ul className='Quiz'> 
                {!ended&&
                (<><li style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div style={{width:"7em",height:"7em"}}>
                    <img src={correctImg[_random.current]} style={{fontSize:0,lineHeight:0}} width={!wrongAdded.current&&answerShown?"100%":"0"} height={!wrongAdded.current&&answerShown?"100%":"0"}/>
                    <img src={falseImg[_random.current]} style={{fontSize:0,lineHeight:0}} width={wrongAdded.current&&answerShown?"100%":"0"} height={wrongAdded.current&&answerShown?"100%":"0"}/>
                </div>
                </li> 
                <li><span>{ques?.q}</span></li>       
                {ques?.a.map((answer,order)=>(<Choice answer={answer} key={answer.id} id={order} answerShown={answerShown}  handleAnswerClick={handleAnswerClick}/>))}
                <li>
            {answerShown&&!autoTimer?<button className="SubmitButton" onClick={handleSubmit}>Continue</button>:undefined}
                </li>
                </>
                )}
                <li style={{marginTop:"2em"}}>
                    <BottomNav swapDeck={swapDeck} ended={ended} restart={restart} dtExport={dtExport} swapped={swapped} dtImport={dtImport}/>
                </li>
                <li>
                    <div style={{opacity:countdown?1:0}}><span>{countdownDuration-t+_preCountdown.current}</span>
                    </div>
                </li>
                <li style={{marginTop:"2em"}}>
                    <PercentageInter percentage={(ID+1)/dt.current.poll.length} interPackage={(p:number)=>{
                        interPackage(p)
                        _exported.current=false;
                    }
                        } />
                </li>
                <li>
                    <div><span>{"Current Set: "+dtName}</span></div>
                </li>
                <li style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                    {Object.keys(_choices).map((key)=>{
                        return <div className='dataChoice' key={key}
                        onClick={()=>{
                            if(key==dtName) return
                            /* @ts-ignore */
                              restart(0,_choices[key],key)
                          }} ><span>{'<'+key.toUpperCase()+'>'}</span>
                        </div>
                    })}
                </li>
                <li><BlackButton 
                    triggered={true}
                    onClick={()=>{
                    dt.current.poll.sort(function (a,b){
                        setLoading(true)
                        function chosen(q:PQuestion) {
                            return q.a.reduce((pre,cur)=>{
                                return pre+ Math.abs(cur.chosen)
                            },0)
                        }
                        return chosen(a)-chosen(b)
                    })
                    if(ID==0) prepareAnswers()
                    else setID(0)
                    setLoading(false)
                }}>Pioritize least answered question</BlackButton></li>
                </ul>
            }
        </div>
};


interface PercentageInterProps {
    percentage:number,
    interPackage:(p:number)=>void,
}

export const PercentageInter: React.FC<PercentageInterProps> = ({percentage,interPackage}) => {
    const [threshold,setThreshold]= React.useState(0);
    const thresArr=[0.05,0.25,0.5,0.75,1,1.25];
    React.useEffect(()=>{
        if(percentage>thresArr[threshold])
            {
                setThreshold(t=>t+1);
                interPackage(percentage)
            }

    },[percentage])
    return <div>
    <PercentageBar percentage={percentage}/>
    </div>;
};


export default Quiz;
