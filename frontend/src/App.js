import React, {Component} from 'react';
import { BrowserRouter as Router,Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import AppNavbar from './components/AppNavbar.js'

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import Logout from './components/logout'


class App extends Component {
    render(){
        return (
            <div className = "App">
            <AppNavbar/>
            </div>
        );
    }
}

export default App;
