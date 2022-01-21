import * as React from "react";

interface BlackButtonProps {
  triggered?: boolean;
  setTriggered?: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?:Function
}

const BlackButton: React.FC<BlackButtonProps> = ({
  triggered,
  setTriggered,
  children,
  onClick
}) => {
  const [buttonColor, setButtonColor] = React.useState<string>("black");
  const [buttonColorText, setButtonColorText] = React.useState<string>("white");
  const [opacity, setOpacity] = React.useState(1);
  const updateButtonColor = () => {
    if (triggered) {
      setButtonColor("black");
      setButtonColorText("white");
      setOpacity(1)
    } else {
      setButtonColor("white");
      setButtonColorText("black");
      setOpacity(0.8)
    }
  };
  React.useEffect(() => {
    updateButtonColor();
  }, [triggered]);
  return (
      <button
        className="BlackButton"
        style={{
          backgroundColor: buttonColor,
          color: buttonColorText,
          opacity: opacity,
        }}
        onMouseEnter={() => {
          setOpacity(0.5);
        }}
        onMouseLeave={() => {
          setOpacity(triggered?1:0.8);
        }}
        onClick={() => {
          setTriggered&&setTriggered(!triggered);
          onClick&&onClick()
        }}
      >{children}
      </button>
  );
};

export default BlackButton;
