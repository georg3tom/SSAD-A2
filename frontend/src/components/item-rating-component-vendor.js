import React, {Component} from 'react';
import axios from 'axios';

export default class Itemrating extends Component {
    
    constructor(props) {
        super(props);
        this.state = {users: [],
        id:0}
        this.fun = this.fun.bind(this);
        this.onChangeId = this.onChangeId.bind(this);
    }

    onChangeId(event) {
        this.setState({ id: event.target.value });
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
                 this.setState({users: this.x});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    fun()
    {
        console.log(this.state.users.length)
        if(this.state.id > this.state.users.length-1)
            return;
        this.selected = this.state.users[this.state.id];
        const newOrder = {
            id: this.selected._id
        }
        axios.post('http://localhost:4000/item/delete', newOrder)
             .then(res => console.log(res.data));
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
        console.log("ues");
    }
    
    render() {
        return (
            <div>
            <h1> YOUR PRODUCTS</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Reviews</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.users.map((currentUser, i) => {
                            return (
                                <tr>
                                    <td>{currentUser.name}</td>
                                    <td>{currentUser.review}</td>
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
                        <input type="submit" onClick={this.fun} value="Cancel" className="btn btn-primary"/>
                    </div>
            </div>
        )
    }
}
