import React,{Component} from 'react'
import './App.css';
import {Switch, Route} from 'react-router-dom';
import WebSSH from './pages/ssh/index';
class App extends Component{

    render() {

        return (
            <Switch>

                <Route path="/" exact component={WebSSH} />
            </Switch>
        );
    }
}

export default App;
