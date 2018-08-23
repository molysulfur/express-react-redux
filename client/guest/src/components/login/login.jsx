import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from "../loading";
import { userActions } from "../../actions/userActions";


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
        this.props.dispatch(userActions.signIn(this.state))
    }
    render() {
        return (
            <div>
                {this.state.load && <Loading />}
                <form onSubmit={e => this.onSubmit(e)}>
                    <div className="form-group">
                        <input className="form-control" type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={e => this.onInputChange(e)} required />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" name="password" id="password" placeholder="Password" value={this.state.password} onChange={e => this.onInputChange(e)} required />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-info btn-block" type="submit">Log in</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect()(Login);