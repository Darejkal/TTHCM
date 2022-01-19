

import React, { useEffect, useState } from 'react';
import './App.css';
import Quiz from './comp/Quiz';
type AppProps = {
}
const App:React.FC<AppProps>=()=>{
  return (
      <div className="App" >
      <Quiz />
    </div>
  );
}

export default App;







