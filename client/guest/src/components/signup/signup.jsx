import React, { Component } from 'react';

import { userActions } from "../../actions/userActions";
import Loading from "../loading";

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            name: '',
            age: '',
            load: false,
            hasAlready: false,
            success: false,
            errror: false,
            messageError: ''
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

        userActions.isEmailExists(this.state.email).then(data => {
            if (!data.status) {
                userActions.userSignupRequest(this.state).then(res => {
                    if (res.status) {
                        this.setState({
                            email: '',
                            password: '',
                            name: '',
                            age: '',
                            load: false,
                            hasAlready: false,
                            errror: false,
                            messageError: '',
                            success: true
                        })
                    } else {
                        this.setState({
                            email: '',
                            name: '',
                            age: '',
                            load: false,
                            success: false,
                            hasAlready: false,
                            errror: false,
                            messageError: res.message
                        })
                    }
                })
            } else {
                this.setState({
                    password: '',
                    load: false,
                    hasAlready: true,
                    errror: false,
                    messageError: '',
                    success: false
                })
            }
        })
    }

    render() {
        return (
            <div>
                {this.state.hasAlready && <div className="alert alert-warning text-center">This email has already.</div>}
                {this.state.success && <div className="alert alert-success text-center">Success !</div>}
                {this.state.errror && <div className="alert alert-danger text-center">{this.state.messageError}</div>}
                {this.state.load && <Loading /> }
                <form onSubmit={e => {
                    this.onSubmit(e)
                }}>
                    <div className="form-group">
                        <input className="form-control" type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={e => this.onInputChange(e)} required />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" name="password" id="password" placeholder="Password" value={this.state.password} onChange={e => this.onInputChange(e)} required />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={e => this.onInputChange(e)} required />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="number" min="0" name="age" id="age" placeholder="Age" value={this.state.age} onChange={e => this.onInputChange(e)} required />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-info btn-block" type="submit" disabled={this.state.load}>Sign up</button>
                    </div>
                </form>
            </div>
        );
    }
}


export default (Signup);