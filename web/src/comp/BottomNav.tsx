import * as React from "react";
import { fDownload, fOpen } from "./_Functions";

interface BottomNavProps {
  swapDeck: Function;
  ended: boolean;
  restart: Function;
  dtExport: Function;
  dtImport: Function;
  swapped: boolean;
}

const BottomNav: React.FC<BottomNavProps> = ({
  swapDeck,
  ended,
  restart,
  dtExport,
  dtImport,
  swapped,
}) => {
  return (
    <div className="BottomNav">
      {!swapped && (
        <>
          <button
            onClick={() => {
              dtExport();
            }}
          >
            Export Data
          </button>
          <button
            onClick={() => {
              dtImport();
            }}
          >
            Import Data
          </button>
        </>
      )}
      <button
        onClick={() => {
          swapDeck();
        }}
      >
        {swapped ? "Return to the main Deck" : "Practice Wrong Answers"}
      </button>
      {ended && <button onClick={() => restart()}>Restart The Deck</button>}
    </div>
  );
};

export default BottomNav;
