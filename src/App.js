import './App.css';
import React, { useEffect } from 'react';
import DrawChart from './component/drawChart';

function App() {

  return (
    <div className="App">
      <DrawChart
        policyId={'565c46f59d8e92eb47404b348cc4ff88a625d25ecbe4bab92ff25e56'}
      />
    </div>
  );
}

export default App;
