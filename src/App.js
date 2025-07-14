
import './App.css';
import { useState } from 'react';
import React from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App=()=> {
 const  pagesize = 15;
 const  apikey = "64c649f07eea4eeba7fd88e0cb91d437"
  const [progress,setProgress] = useState(0);

  // state = {
  //   progress: 0
  // }

  // setProgress = (progress) => {
  //    this.setState({
  //       progress: progress
  //     })
  // }
    
  
    return (
      <div>
        <Router>
          <Navbar> </Navbar>   
          <div className='container'  >   
            <LoadingBar
            height={3}
              color="#f11946"
              progress={progress}    
            />
            </div>
          
          <Routes>
            <Route path='/' element={<News  setProgress={setProgress}  apikey={apikey} key="general" pagesize={pagesize} country="us" category="general" />}> </Route>
            <Route path='/Sports' element={<News  setProgress={setProgress}  apikey={apikey} key="sports" pagesize={pagesize} country="us" category="sports" />}> </Route>
            <Route path='/Science' element={<News  setProgress={setProgress}  apikey={apikey} key="science" pagesize={pagesize} country="us" category="science" />}> </Route>
            <Route path='/Business' element={<News  setProgress={setProgress}  apikey={apikey} key="business" pagesize={pagesize} country="us" category="business" />}> </Route>
            <Route path='/Entertainment' element={<News  setProgress={setProgress}  apikey={apikey} key="entertainment" pagesize={pagesize} country="us" category="entertainment" />}> </Route>
            <Route path='/Technology' element={<News  setProgress={setProgress}  apikey={apikey} key="technology" pagesize={pagesize} country="us" category="technology" />}> </Route>
            <Route path='/Health' element={<News  setProgress={setProgress}  apikey={apikey} key="health" pagesize={pagesize} country="us" category="health" />}> </Route>

          </Routes>
        </Router>
      </div>
    )
  }

export default App
