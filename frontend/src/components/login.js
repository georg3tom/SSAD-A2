import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route,Redirect, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            btncolor: 'btn btn-primary',
            pas_corr: ''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.isloggedin();
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    funfun(res){
        console.log(res);
        sessionStorage.setItem("zzz",res.token);
        sessionStorage.setItem("type",res.user.type);
        sessionStorage.setItem("name",res.user.username);
        let x=sessionStorage.getItem("zzz");
        if( x!=null && x!="null" )
            window.location.replace("/");
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            password: this.state.password
        }
        let k="";
        sessionStorage.setItem("zzz",null);
        axios.post('http://localhost:4000/user/login', newUser)
             .then(res => this.funfun(res.data));
        this.setState({
            username: '',
            password: '',
            btncolor: 'btn btn-danger',
            // pas_corr: 'Wrong credentials or user doesnt exist'
        });
    }
    isloggedin() {
        let x=sessionStorage.getItem("zzz");
        console.log("k"+x);
        if( x!=null && x!="null" )
            window.location.replace("/");
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className={this.state.btncolor}/>
                    </div>
                    { this.state.pas_corr }
                </form>
            </div>
        )
    }
}
