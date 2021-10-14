import React, {Component} from 'react';
import axios from 'axios';

export default class Itemslist extends Component {
    
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
                this.x=[];
                console.log(response.data);
                for (const item of response.data){
                    console.log(item.quantity);
                    if((typeof item.username)=="string" && item.username==sessionStorage.getItem("name") && item.quantity==0 && item.st!=="Dispatched")
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
        if(this.state.id > this.state.users.length-1)
            return;
        // if(typeof(this.state.id)!==Number)
        //     return;
        this.selected = this.state.users[this.state.id];
        if(!this.selected)
        {
            return;
        }
        const newOrder = {
            id: this.selected._id
        }
        axios.post('http://localhost:4000/order/dispatch', newOrder)
             .then(res => console.log(res.data));
        const Token = {
            token: sessionStorage.getItem("zzz")
        }
        this.componentDidMount();
        console.log("ues");
    }
    
    render() {
        return (
            <div>
            <h1>PRODUCTS READY TO DISPATCH</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
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
                        <input type="submit" onClick={this.fun} value="Dispatch" className="btn btn-primary"/>
                    </div>
            </div>
        )
    }
}
