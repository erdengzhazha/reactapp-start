import React,{Component} from 'react'
import './App.css';
import {Switch, Route} from 'react-router-dom';
import WebSSH from './pages/ssh/component'


class App extends Component{

    render() {
        return (
            <Switch>
                {/*<Route path="/" exact component={Login} />*/}
                <Route path="/" exact component={WebSSH} />
                {/*<Route component={Layout} />*/}
            </Switch>
        );
    }
}

export default App;
