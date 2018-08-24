import React, { Component } from 'react';
import { Link } from "react-router-dom";
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

            < div className="wrapper-page animated fadeInDown" >
                {/* {this.state.load && <Loading />} */}
                <div className="panel panel-color panel-primary">
                    <div className="panel-heading">
                        <h3 className="text-center m-t-10">Sign In</h3>
                    </div>
                    {this.props.errorLogin && <div className="alert alert-danger text-center">{this.props.errorMsgLogin}</div>}
                    <form className="form-horizontal m-t-40" onSubmit={e => this.onSubmit(e)}>
                        <div className="form-group">
                            <div className="col-xs-12">
                                <input className="form-control" type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={e => this.onInputChange(e)} required />
                            </div>
                        </div>
                        <div className="form-group ">
                            <div className="col-xs-12">
                                <input className="form-control" type="password" name="password" id="password" placeholder="Password" value={this.state.password} onChange={e => this.onInputChange(e)} required />
                            </div>
                        </div>

                        <div className="form-group text-right">
                            <div className="col-xs-12">
                                <button className="btn btn-purple w-md" type="submit">Log In</button>
                            </div>
                        </div>
                        <div className="form-group m-t-30">
                            <div className="col-sm-7">
                                <a href="recoverpw.html"><i className="fa fa-lock m-r-5"></i> Forgot your password?</a>
                            </div>
                            <div className="col-sm-5 text-right">
                                <Link to="signup">Create an account</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn = false, errorMsgLogin = "", token = "", errorLogin = false } = state.authentication
    return { loggedIn, errorMsgLogin, token, errorLogin }
}
export default connect(mapStateToProps)(Login);