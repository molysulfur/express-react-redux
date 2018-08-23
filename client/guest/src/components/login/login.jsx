import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from "../loading";
import { userActions } from "../../actions/userActions";
import { userConstants } from "../../constants/userConstants";


class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            load: false,
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
            load: true,
        })
        userActions.signIn(this.state).then(token => {
            this.props.dispatch({ type: userConstants.LOGIN_SUCCESS, token })
            this.setState({
                load: false
            })
        }).catch(error => {
            this.props.dispatch({ type: userConstants.LOGIN_FAILURE, error })
            this.setState({
                load: false
            })
        })



    }
    render() {
        return (
            <div>
                {this.state.load && <Loading />}
                {this.props.errorLogin && <div className="alert alert-danger text-center">{this.props.errorMsgLogin}</div>}
                <form onSubmit={e => this.onSubmit(e)}>
                    <div className="form-group">
                        <input className="form-control" type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={e => this.onInputChange(e)} required />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" name="password" id="password" placeholder="Password" value={this.state.password} onChange={e => this.onInputChange(e)} required />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-info btn-block" type="submit" disabled={this.state.load}>Log in</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn = false, errorMsgLogin = "", token = "", errorLogin = false } = state.authentication
    return { loggedIn, errorMsgLogin, token, errorLogin }
}
export default connect(mapStateToProps)(Login);