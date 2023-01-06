import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Employee from './Employee';
import CreateEmp from './CreateEmp';
import { useEffect, useState } from 'react';


function App() {


    const [timeState, setTimeState] = useState();

    useEffect(() =>{
        setInterval(() => {
           const date = new Date();
           setTimeState(date.toLocaleTimeString());
        }, 1000);

    }, []);

  

  return (
    <div className="App">
      <h3>Employee Database</h3>
 -    <div style={{fontSize:"30px" ,"textAlign":"right"}}>{timeState}</div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Employee />}> </Route>
          <Route path='/employee/create' element={<CreateEmp />}> </Route>
          {/* <Route path='/employee/time' element={<Time />}> </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
