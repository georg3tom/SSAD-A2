import React, {Component} from 'react';
import axios from 'axios';
import {Card, Button,Form } from 'react-bootstrap';

export default class Orderlist extends Component {

    constructor(props) {
        super(props);
        this.state = {users: [],
            ori:[],
            qty:0,
            email:''
        }
        this.onChangeQty = this.onChangeQty.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.fun = this.fun.bind(this);
    }
    onChangeQty(event) {
        this.setState({ qty: event.target.value });
    }

    onChangeEmail(event) {
        this.tmp=event.target.value;
        this.x=[];
        // console.log(this.state.email)
        for (const item of this.state.ori){
            if(item.name.indexOf(this.tmp)!=-1)
                this.x.push(item);
        }
        this.setState({users: this.x});
        this.setState({ email: event.target.value });
        // console.log(this.x);

    }
    fuzzySearch()
    {
        this.tmp = this.filterValuePart(this.state.users,this.state.email);
        console.log(this.tmp);
    }


    componentDidMount() {
        const Token = {
            token: sessionStorage.getItem("zzz")
        }
        axios.post('http://localhost:4000/order/',Token)
            .then(response => {
                console.log("kk"+ response.data);
                // this.setState({users: response.data,ori:response.data});
                this.x=[];
                console.log(response.data);
                for (const item of response.data){
                    if((typeof item.customer)=="string"&&item.customer==sessionStorage.getItem("name"))
                        this.x.push(item);
                }
                this.setState({users: this.x,ori:this.x});
            })
            .catch(function(error) {
                console.log(error);
            })
    }
    fun(){
        console.log(this.state)
    }

    render() {
        return(
            <div>
            <h1>ORDERED ITEMS</h1>
            <div className="form-group">
            <label>search: </label>
            <input type="text" 
            className="form-control" 
            value={this.state.email}
            onChange={this.onChangeEmail}
            />  
            </div>
            <table className="table table-striped">
            <thead>
            <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Quantity</th>
            </tr>
            </thead>
            <tbody>
            { 
                this.state.users.map((currentUser, i) => {
                    return (
                        <tr>
                        <td>{currentUser.name}</td>
                        <td>{currentUser.st}</td>
                        <td>{currentUser.quantity}</td>
                        </tr>
                    )
                })
            }
            </tbody>
            </table>
            </div>
        )
    }
}
