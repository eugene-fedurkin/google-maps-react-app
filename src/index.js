import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.c';
import JobUp from './components/job-up.c';
import Hist from './components/history.c';
import Dashboard from './components/dashboard.c';
import Header from './components/header.c';
import Profile from './components/profile.c';

import { Route, BrowserRouter } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <BrowserRouter>
        <div className="fullHeight">
            <Header />
            <Route path='/' exact component={Dashboard} />
            <Route path='/job' component={JobUp} />
            <Route path='/history' component={Hist} />
            <Route path='/profile' component={Profile} />
        </div>
    </BrowserRouter>,
     document.getElementById('root'));
registerServiceWorker();
