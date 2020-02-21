import React, {Component} from 'react';
import axios from 'axios';
import {Card, Button,Form } from 'react-bootstrap';

export default class ReviewC extends Component {

    constructor(props) {
        super(props);
        this.state = {users: [],
            ori:[],
            qty:0,
            review:'',
            email:'',
            rating:5,
            id:0
        }
        this.onChangeReview = this.onChangeReview.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.fun = this.fun.bind(this);
        this.onChangeId = this.onChangeId.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
    }
    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onChangeId(event) {
        this.setState({ id: event.target.value });
    }
    onChangeReview(event) {
        this.setState({ review: event.target.value });
    }

    onChangeRating(event) {
        this.setState({ rating: event.target.value });
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
                    if(item.st==="Dispatched")
                        this.x.push(item);
                }
                 this.setState({users: this.x,ori:this.x});
            })
            .catch(function(error) {
                console.log(error);
            })
    }
    fun(){

        if(this.state.id > this.state.users.length-1)
            return;
        this.selected = this.state.users[this.state.id];
        const newOrder = {
            rating: this.state.rating,
            review: this.state.review,
            token: sessionStorage.getItem("zzz"),
            itemid: this.selected._id,
            username: this.selected.username,
        }

        axios.post('http://localhost:4000/user/rating', newOrder)
             .then(res => console.log(res.data));
        axios.post('http://localhost:4000/item/rating', newOrder)
             .then(res => console.log(res.data));

    }

    render() {
        return(
            <div>
            <h1>REVIEW ORDER</h1>
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
                        </tr>
                    )
                })
            }
            </tbody>
            </table>
                    <div className="form-group">
                        <label>ID: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.id}
                               onChange={this.onChangeId}
                               />
                    </div>
                    <div className="form-group">
                        <label>Product review: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.review}
                               onChange={this.onChangeReview}
                               />
                    </div>
                    <div className="form-group">
                        <label>Vendor Rating: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.rating}
                               onChange={this.onChangeRating}
                               />
                    </div>

                    <div className="form-group">
                        <input type="submit" onClick={this.fun} value="Review Order" className="btn btn-primary"/>
                    </div>
            </div>
        )
    }
}
