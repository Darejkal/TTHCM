import * as React from 'react';

interface TimeElapsedProps {
}
function show2charnum(x:number){
    let s = x.toString();
    if(s.length<2) s='0'+s;
    return s
}
const TimeElapsed: React.FC<TimeElapsedProps> = props => {
    const [t,setT]=React.useState<number>(0);
    const [s,setS]=React.useState<boolean>(true);
    React.useEffect(()=>{
        let _t= setInterval(()=>{
            setT(t=>t+1)
            setS(s=>!s)
        }, 1000);
        return ()=>{
            clearInterval(_t);
        }
    },[])
    return <div className="TimeElapsed">
        <span>Time Elapsed: {show2charnum(Math.floor(t/3600))}</span>
        <span style={{opacity:s?"100%":"50%"}}>:</span>
        <span>{show2charnum(Math.floor(t%3600/60))}</span>
        <span style={{opacity:s?"100%":"50%"}}>:</span>
        <span>{show2charnum(Math.floor(t%60))}</span>
        </div>;
};
export default TimeElapsed;
