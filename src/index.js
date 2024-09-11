import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Helmet } from 'react-helmet';
import React from 'react';

import Image from './components/image';
import App from './App';

import './css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
      <Helmet>
        <title>nnexsus.net</title>
        <meta property="og:title" content="nnexsus.net" />
        <meta property="og:description" content="nnexsus.net is a windows 7 design inspired site for viewing my weather photos and videos in high quality!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/Screenshot_2.png" />
        <meta property="og:url" content="https://nnexsus.net" />
        <meta name="theme-color" content="#2be387"/>

        <meta name="twitter:card" content="summary_large_image"/>
            
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="314" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://nnexsus.net/" />
        <meta property="twitter:title" content="nnexsus.net" />
        <meta property="twitter:description" content="nnexsus.net is a windows 7 design inspired site for viewing my weather photos and videos in high quality!" />
        <meta property="twitter:image" content="/images/Screenshot_2.png" />
      </Helmet>
      <Router>
        <Routes>
          <Route path='/image/:id' element={<Image/>}/>
          <Route path='/' element={<App/>}/>
        </Routes>
      </Router>
  </>
);