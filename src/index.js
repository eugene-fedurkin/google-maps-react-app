import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './register-service-worker';
import './index.css';
import Header from './components/header.component';
import Dashboard from './components/dashboard.component';
import JobUp from './components/job-up.component';
import Hist from './components/history.component';
import Profile from './components/profile.component';

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
    document.getElementById('root')
);

registerServiceWorker();