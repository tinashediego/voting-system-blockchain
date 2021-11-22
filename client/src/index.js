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
            <Route exact path="/" component={App}></Route>
            <Route path="/AddCandidate" component={AddCandidate}></Route>
            <Route path="/CandidateDetails" component={CandidateDetails}></Route>
            <Route path="/RequestVoter" component={RequestVoter}></Route>
            <Route path="/VerifyVoter" component={VerifyVoter}></Route>
            <Route path="/Vote" component={Vote}></Route>
            <Route path="/Admin" component={Admin}></Route>
            <Route path="/Result" component={Result}></Route>
            
        </Switch>
    </Router>,
    document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
