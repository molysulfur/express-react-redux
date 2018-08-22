import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from "../../actions/signin/signinAction";
import axios from "axios";

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            load: false,
            error: false
        }
        this.onInputChange = this.onInputChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()
        this.setState({
            load: true
        })

        const { email, password } = this.state
        axios.post('http://localhost:8080/api/login', {
            email,
            password
        }).then(res => {
            this.props.dispatch(signIn(res.data))

            console.log(this.props.loggedIn, this.props.user)

        }).catch(error => {
            console.error(error)
        })

        this.setState({
            email: '',
            password: '',
            load: false

        })
    }
    render() {
        return (
            <form onSubmit={e => this.onSubmit(e)}>
                <div className="form-group">
                    <input className="form-control" type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={e => this.onInputChange(e)} required />
                </div>
                <div className="form-group">
                    <input className="form-control" type="password" name="password" id="password" placeholder="Password" value={this.state.password} onChange={e => this.onInputChange(e)} required />
                </div>
                <div className="form-group">
                    <button className="btn btn-info" type="submit">Log in</button>
                </div>
            </form>
        );
    }
}

function mapStateToProps(state){
    const { loggedIn, user } = state.signIn
    return {
        loggedIn,
        user
    }
}

export default connect(mapStateToProps)(Login);