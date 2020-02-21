import React,{Component} from 'react';
import { BrowserRouter as Router, Route,Redirect, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'

import UsersList from './users-list.component'
import CreateUser from './create-user.component'
import CreateItem from './create-item.component'
import Login from './login'
import Additem from './create-item.component'
import Listitemv from './items-list-component-vendor'
import Listitemv1 from './items-list-component-customer'
import Orderlist from './order-list-component-customer'
import Orderlist1 from './order-list-component-vendor'
import Dispatch from './dispatch-list-component-vendor'
import Dispatched from './dispatched-list-component-vendor'
import VendorR from './vendor-review.component'
import ReviewC from './review-list-component-customer'
import Itemrating from './item-rating-component-vendor'

class AppNavbar extends Component {
    constructor(props){
        super(props);
        this.isin=sessionStorage.getItem("zzz");
        this.pp="Login"
        this.home='/listitem';
        if(sessionStorage.getItem("type")==="Vendor")
            this.home="/listitemv";
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
            <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href={this.home}>Piggy</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            {sessionStorage.getItem("zzz")=="null" && 
                <Nav.Link href="/create">Register</Nav.Link>
            }
            {sessionStorage.getItem("type")=="Customer" && 
                    <Nav.Link href="/listitem">Products List</Nav.Link>
            }
            {sessionStorage.getItem("type")=="Customer" && 
                    <Nav.Link href="/orderlist">Order List</Nav.Link>
            }
            {sessionStorage.getItem("type")=="Customer" && 
                    <Nav.Link href="/vendorrating">Vendor Rating</Nav.Link>
            }
            {sessionStorage.getItem("type")=="Customer" && 
                    <Nav.Link href="/review">Review Products</Nav.Link>
            }
            {sessionStorage.getItem("type")=="Vendor" && 
                    <Nav.Link href="/listitemv">List Products</Nav.Link>
            }
            {sessionStorage.getItem("type")=="Vendor" && 
                    <Nav.Link href="/additem">Add Products</Nav.Link>
            }
            {sessionStorage.getItem("type")=="Vendor" && 
                    <Nav.Link href="/dispatch">Dispatch Products</Nav.Link>
            }
            {sessionStorage.getItem("type")=="Vendor" && 
                    <Nav.Link href="/dispatched">Dispatched Products</Nav.Link>
            }
            {sessionStorage.getItem("type")=="Customer" && 
                    <Nav.Link href="/dispatched">Products Reviews</Nav.Link>
            }

            </Nav>
            <Nav>
            <Nav.Link href="#deets" onClick={this.handleLoginClick}>{this.pp}</Nav.Link>
            </Nav>
            </Navbar.Collapse>
            </Navbar>
            </div>
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
            <Route path="/dispatch" component={Dispatch}/>
            <Route path="/dispatched" component={Dispatched}/>
            <Route path="/vendorrating" component={VendorR}/>
            <Route path="/review" component={ReviewC}/>
            <Route path="/itemrating" component={Itemrating}/>
            </div>
            </Router>
        );
    }
}
export default AppNavbar;
