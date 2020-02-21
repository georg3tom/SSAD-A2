import React, {Component} from 'react';
import axios from 'axios';

export default class UsersList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {users: [],ori:[],email:''}
        this.onChangeEmail = this.onChangeEmail.bind(this);
    }
    onChangeEmail(event) {
        this.tmp=event.target.value;
        this.x=[];
        // console.log(this.state.ori);
        for (const item of this.state.ori){
            if((typeof item.username)=="string"&&item.username.indexOf(this.tmp)!=-1)
                this.x.push(item);
        }
        this.setState({users: this.x});
        this.setState({ email: event.target.value });
        // console.log(this.x);
    }


    componentDidMount() {
        axios.get('http://localhost:4000/user/')
             .then(response => {
                this.x=[];
                console.log(response.data);
                for (const item of response.data){
                    console.log(item.quantity);
                    if((typeof item.type)=="string"&&item.type==="Vendor")
                    {
                        this.x.push(item);
                    }
                }
                 this.setState({users: response.data,ori:response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    render() {
        return (
            <div>
            <h1>Vendor Review</h1>
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
                            <th>Username</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.users.map((currentUser, i) => {
                            return (
                                <tr>
                                    <td>{currentUser.username}</td>
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
