import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Router, Switch, Route} from 'react-router-dom';
import history from './history';
import AddCandidate from './components/AddCandidate';
import CandidateDetails from './components/CandidateDetails';
import RequestVoter from './components/RequestVoter';
import VerifyVoter from './components/VerifyVoter';
import Vote from './components/Vote';
import Admin from './components/Admin';
import Result from './components/Result';

ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/AddCandidate" component={AddCandidate} />
            <Route path="/CandidateDetails" component={CandidateDetails} />
            <Route path="/RequestVoter" component={RequestVoter} />
            <Route path="/VerifyVoter" component={VerifyVoter} />
            <Route path="/Vote" component={Vote} />
            <Route path="/Admin" component={Admin} />
            <Route path="/Result" component={Result} />
            
        </Switch>
    </Router>,
    document.getElementById('root')
    );

