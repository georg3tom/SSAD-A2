import React, {Component} from 'react';
import axios from 'axios';

export default class Dispatched extends Component {
    
    constructor(props) {
        super(props);
        this.tmp="DISPATCHED PRODUCTS"
        if(sessionStorage.getItem("type")=="Customer")
            this.tmp="PRODUCTS Reviews";
        this.state = {users: [],
        id:0,
        head:this.tmp
        }
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
                    if((typeof item.username)=="string"&&item.username==sessionStorage.getItem("name")&&item.quantity==0&&item.st==="Dispatched"||sessionStorage.getItem("type")==="Customer")
                        this.x.push(item);
                }
                this.setState({users: this.x});
             })
             .catch(function(error) {
                 console.log(error);
             })
        axios.get('http://localhost:4000/user/')
             .then(response => {
                for (const item of response.data)
                 {
                     if(item.username===sessionStorage.getItem("name"))
                        this.rating=item.rating;
                 }
                 this.setState({rating: this.rating});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    fun()
    {
        if(this.state.id > this.state.users.length-1)
            return;
        this.selected = this.state.users[this.state.id];
        const newOrder = {
            id: this.selected._id
        }
        axios.post('http://localhost:4000/order/dispatch', newOrder)
             .then(res => console.log(res.data));
        const Token = {
            token: sessionStorage.getItem("zzz")
        }
        console.log("ues");
    }
    
    render() {
        return (
            <div>
            <h1>{this.tmp}</h1>
            <h4>Your Rating:{this.state.rating}</h4><br/>
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
                                    <td>{currentUser.rating}</td>
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
