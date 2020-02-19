import React, {Component} from 'react';
import axios from 'axios';
import {Card, Button,Form } from 'react-bootstrap';

export default class Itemslist extends Component {

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
        axios.post('http://localhost:4000/item/',Token)
            .then(response => {
                console.log("kk"+ response.data);
                this.setState({users: response.data,ori:response.data});
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
            <h1>ORDER ITEMS</h1>
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
            <th>Price</th>
            <th>Quantity</th>
            <th>Order</th>
            </tr>
            </thead>
            <tbody>
            { 
                this.state.users.map((currentUser, i) => {
                    return (
                        <tr>
                        <td>{currentUser.name}</td>
                        <td>{currentUser.price}</td>
                        <td> 
                        <div className="form-group">
                        <input id="qty" type="text" 
                        className="form-control" 
                        // value={this.state.qty}
                        />  
                        </div>
                        </td>
                        <td>
                        <div className="form-group">
                        <input type="submit" value="Order" onClick={this.fun} className="btn btn-primary"/>
                        </div>
                        </td>
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
