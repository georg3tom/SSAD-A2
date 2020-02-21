import React, {Component} from 'react';
import axios from 'axios';
import {Card, Button,Form } from 'react-bootstrap';

export default class Itemslist extends Component {

    constructor(props) {
        super(props);
        this.state = {users: [],
            ori:[],
            qty:0,
            email:'',
            id:0
        }
        this.onChangeQty = this.onChangeQty.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.fun = this.fun.bind(this);
        this.onChangeId = this.onChangeId.bind(this);
    }
    onChangeQty(event) {
        this.setState({ qty: event.target.value });
    }
    onChangeId(event) {
        this.setState({ id: event.target.value });
    }

    onChangeEmail(event) {
        this.tmp=event.target.value;
        this.x=[];
        // console.log(this.state.email)
        for (const item of this.state.ori){
            if((typeof item.name)=="string"&&item.name.indexOf(this.tmp)!=-1)
                this.x.push(item);
        }
        this.setState({users: this.x});
        this.setState({ email: event.target.value });
        // console.log(this.x);
    }

    componentDidMount() {
        const Token = {
            token: sessionStorage.getItem("zzz")
        }
        axios.post('http://localhost:4000/item/',Token)
            .then(response => {
                console.log("kk"+ response.data);
                this.x=[];
                for (const item of response.data){
                    if(item.quantity>0)
                        this.x.push(item);
                }
                 this.setState({users: this.x});
            })
            .catch(function(error) {
                console.log(error);
            })
    }
    fun(){
        if(this.state.qty<1)
        {
            return;
        }

        if(this.state.id > this.state.users.length-1 )
            return;
        this.selected = this.state.users[this.state.id];
        const newOrder = {
            vendor: this.selected.username,
            itemid: this.selected._id,
            token: sessionStorage.getItem("zzz"),
            quantity: this.state.qty,
            name: this.selected.name,
        }

        axios.post('http://localhost:4000/order/add', newOrder)
             .then(res => console.log(res.data));
        this.componentDidMount();

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
            <th>id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity Available</th>
            </tr>
            </thead>
            <tbody>
            { 
                this.state.users.map((currentUser, i) => {
                    return (
                        <tr>
                        <td>{i}</td>
                        <td>{currentUser.name}</td>
                        <td>{currentUser.price}</td>
                        <td>{currentUser.quantity}</td>
                        </tr>
                    )
                })
            }
            </tbody>
            </table>
                    <div className="form-group">
                        <label>Id: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.id}
                               onChange={this.onChangeId}
                               />
                    </div>

                    <div className="form-group">
                        <label>Quantity: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.qty}
                               onChange={this.onChangeQty}
                               />  
                    </div>

                    <div className="form-group">
                        <input type="submit" onClick={this.fun} value="Place Order" className="btn btn-primary"/>
                    </div>
            </div>
        )
    }
}
