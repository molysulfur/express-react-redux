import React, { Component } from 'react';
import Loading from "../loading";

import { userActions } from "../../actions/userActions";


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
            < div className="wrapper-page animated fadeInDown" >

                {this.state.hasAlready && <div className="alert alert-warning text-center">This email has already.</div>}
                {this.state.success && <div className="alert alert-success text-center">Success !</div>}
                {this.state.errror && <div className="alert alert-danger text-center">{this.state.messageError}</div>}
                {this.state.load && <Loading />}

                {this.props.errorLogin && <div className="alert alert-danger text-center">{this.props.errorMsgLogin}</div>}
                <div className="panel panel-color panel-primary">
                    <div className="panel-heading">
                        <h3 className="text-center m-t-10">Sign In</h3>
                    </div>
                    <form className="form-horizontal m-t-40" onSubmit={e => this.onSubmit(e)}>
                        <div className="form-group">
                            <div className="col-xs-12">

                                <input className="form-control" type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={e => this.onInputChange(e)} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-12">

                                <input className="form-control" type="password" name="password" id="password" placeholder="Password" value={this.state.password} onChange={e => this.onInputChange(e)} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-12">

                                <input className="form-control" type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={e => this.onInputChange(e)} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-12">

                                <input className="form-control" type="number" min="0" name="age" id="age" placeholder="Age" value={this.state.age} onChange={e => this.onInputChange(e)} required />
                            </div>
                        </div>

                        <div class="form-group text-right">
                            <div class="col-xs-12">
                                <button class="btn btn-purple w-md" type="submit" disabled={this.state.load}>Register</button>
                            </div>
                        </div>

                        <div class="form-group m-t-30">
                            <div class="col-sm-12 text-center">
                                <a href="login.html">Already have account?</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default (Signup);