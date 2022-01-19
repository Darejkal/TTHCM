import * as React from "react";

interface PercentageBarProps {
percentage:number;
}

const PercentageBar: React.FC<PercentageBarProps> = ({percentage}) => {
    const [showPercentage,setShowPercentage]=React.useState(false)
    const [height,setHeight]=React.useState("0.5em")
    const [opacity1,setOpacity1]=React.useState("70%")
    const [opacity2,setOpacity2]=React.useState("40%")
    // React.useEffect(()=>{
    //     setHeight(showPercentage?)
    // },[showPercentage])
return (
    <div
    style={{
        display:"flex",
        flexDirection:"column",
        alignContent:"center"
    }}>
<div
    className="PercentageBar"
    style={{
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    height:height,
    display: "flex",
    flexDirection: "row",
    }}
    onClick={()=>{
        setShowPercentage(showPercentage=>!showPercentage)
    }}
    onMouseDown={()=>{
        setOpacity1("90%")
        setOpacity2("80%")
    }}
    onMouseUp={()=>{
        setOpacity1("100%")
        setOpacity2("70%")
    }}
    onMouseEnter={()=>{
        setHeight("1em")
        setOpacity1("100%")
        setOpacity2("70%")
    }}
    onMouseLeave={()=>{
        !showPercentage&&setHeight("0.5em")
        setOpacity1("70%")
        setOpacity2("40%")
    }}
>
    <div style={{
        flexGrow:percentage>=1?1:percentage,
        backgroundColor:"green",
        opacity:opacity1,
    }}/>
    <div style={{
        flexGrow:percentage>=1?0:1-percentage,
        backgroundColor:"white",
        opacity:opacity2,
    }} />
    {showPercentage&&<div><span>{Math.floor(percentage%1*100)} %</span></div>}
</div>
</div>
);
};

export default PercentageBar;
