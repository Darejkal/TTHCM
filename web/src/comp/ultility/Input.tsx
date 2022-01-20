import * as React from "react";

interface InputProps {
    value:string,
    setValue:React.Dispatch<React.SetStateAction<string>>
}

const Input: React.FC<InputProps> = ({ children,value,setValue }) => {
    const [width,setWidth]=React.useState(5)
    const adjustWidth=(width:number)=>{
        setWidth(width>5?width:5)
    }
    return (
    <div>
      <span>{children}</span>
      <input
        type="text"
        value={value}
        onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
        }}
        onChange={(e) => {setValue(e.target.value);adjustWidth(e.target.value.length)}}
        className="Input"
        style={{margin:"0.2em",width:`${width*8}px`}}
      />
    </div>
  );
};

export default Input;
