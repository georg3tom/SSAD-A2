import React,{Component} from 'react';
import { BrowserRouter as Router, Route,Redirect, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';

import UsersList from './users-list.component'
import CreateUser from './create-user.component'
import CreateItem from './create-item.component'
import Login from './login'
import Additem from './create-item.component'
import Listitemv from './items-list-component-vendor'
import Listitemv1 from './items-list-component-customer'
import Orderlist from './order-list-component-customer'
import Orderlist1 from './order-list-component-vendor'

class AppNavbar extends Component {
    constructor(props){
        super(props);
        this.isin=sessionStorage.getItem("zzz");
        this.pp="Login"
        this.username=sessionStorage.getItem("name");
        this.handleLoginClick = this.handleLoginClick.bind(this);
        console.log(this.username)
        if(this.username!=="null" &this.username!==null)
        {
            console.log(this.username!=="null");
            this.pp = this.username + ": " + "Logout";
        }
        else
        {
            this.pp="Login"
        }
    }
    logout(){
        this.isin=sessionStorage.setItem("zzz",null);
        this.username=sessionStorage.setItem("name",null);
        this.type=sessionStorage.setItem("type",null);
        this.pp="Login"
    }
    handleLoginClick() 
    {
        this.logout();
        window.location.replace("/login");
    }
    render() {
        return (
            <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Piggy</Link>
            <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
            <Link to="/" className="nav-link">Users</Link>
            </li>
            {sessionStorage.getItem("zzz")=="null" && 
            <li className="navbar-item">
            <Link to="/create" className="nav-link">Register User</Link>
            </li>
            }
            {sessionStorage.getItem("type")=="Customer" && 
            <li className="navbar-item">
            <Link to="/listitem" className="nav-link"> Products list</Link>
            </li>
            }
            {sessionStorage.getItem("type")=="Customer" && 
            <li className="navbar-item">
            <Link to="/orderlist" className="nav-link"> Order list</Link>
            </li>
            }
            {sessionStorage.getItem("type")=="Vendor" && 
            <li className="navbar-item">
            <Link to="/listitemv" className="nav-link">List Products</Link>
            </li>
            }
            {sessionStorage.getItem("type")=="Vendor" && 
            <li className="navbar-item">
            <Link to="/additem" className="nav-link">Add item</Link>
            </li>
            }
            {sessionStorage.getItem("type")=="Vendor" && 
            <li className="navbar-item">
            <Link to="/orderlistv" className="nav-link">Dispatch Products</Link>
            </li>
            }
            </ul>
            <ul className="navbar-nav mr-auto">
            </ul>
            <ul className="navbar-nav mr-auto">
            </ul>
            <ul className="navbar-nav mr-auto">
            <li className="navbar-item nav-link">
            <Link to="#" className="nav-link" onClick={this.handleLoginClick}> {this.pp}
            </Link>
            </li>
            </ul>
            </div>
            </nav>
            <div className="container">
            <br/>
            <Route path="/" exact component={UsersList}/>
            <Route path="/create" component={CreateUser}/>
            <Route path="/item" component={CreateItem}/>
            <Route path="/login" component={Login}/>
            <Route path="/additem" component={Additem}/>
            <Route path="/listitemv" component={Listitemv}/>
            <Route path="/listitem" component={Listitemv1}/>
            <Route path="/orderlist" component={Orderlist}/>
            <Route path="/orderlistv" component={Orderlist1}/>
            </div>
            </Router>
        );
    }
}
export default AppNavbar;
