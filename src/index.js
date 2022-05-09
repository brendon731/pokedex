import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Example from "./modal.js"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
ReactDOM.render(
  <React.StrictMode>
    
    <Router>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route path=":pokemon" element={<Example />}/>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


