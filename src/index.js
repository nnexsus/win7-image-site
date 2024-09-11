import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import React from 'react';

import Image from './components/image';
import App from './App';

import './css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
      <Router>
        <Routes>
          <Route path='/image/:id' element={<Image/>}/>
          <Route path='/' element={<App/>}/>
          <Route path='*' element={<App/>}/>
        </Routes>
      </Router>
  </>
);