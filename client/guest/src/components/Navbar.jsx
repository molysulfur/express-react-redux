import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../actions/userActions";

class Navbar extends Component {

    constructor(props) {
        super(props)
        this.logOut = this.logOut.bind(this)
    }

    logOut() {
        this.props.dispatch(userActions.logOut())
    }

    render() {
        const { loggedIn } = this.props
        return (
            <header className="top-head container-fluid">
                <nav className=" navbar-default">
                        <Link className="navbar-brand" to="/home">
                            <i className="ion-social-buffer"></i>
                            <span className="nav-label">React</span>
                        </Link>
                    <ul className="nav navbar-nav navbar-right top-menu top-right-menu">
                        <li className="dropdown">
                            <a data-toggle="dropdown" className="dropdown-toggle">
                                <i className="fa fa-envelope-o "></i>
                                <span className="badge badge-sm up bg-purple count">4</span>
                            </a>
                            <ul className="dropdown-menu extended fadeInUp animated nicescroll" tabIndex="5001">
                                <li>
                                    <p>Messages</p>
                                </li>
                                <li>
                                    <Link to="/">
                                        <span className="pull-left"><img src="img/avatar-2.jpg" className="img-circle thumb-sm m-r-15" alt="img" /></span>
                                        <span className="block"><strong>John smith</strong></span>
                                        <span className="media-body block">New tasks needs to be done<br /><small className="text-muted">10 seconds ago</small></span>
                                    </Link>
                                </li>
                                <li>
                                    <p><Link to="/" className="text-right">See all Messages</Link></p>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a data-toggle="dropdown" className="dropdown-toggle">
                                <i className="fa fa-bell-o"></i>
                                <span className="badge badge-sm up bg-pink count">3</span>
                            </a>
                            <ul className="dropdown-menu extended fadeInUp animated nicescroll" tabIndex="5002">
                                <li className="noti-header">
                                    <p>Notifications</p>
                                </li>
                                <li>
                                    <Link to="/">
                                        <span className="pull-left"><i className="fa fa-user-plus fa-2x text-info"></i></span>
                                        <span>New user registered<br /><small className="text-muted">5 minutes ago</small></span>
                                    </Link>
                                </li>

                                <li>
                                    <p><Link to="/" className="text-right">See all notifications</Link></p>
                                </li>
                            </ul>
                        </li>
                        {loggedIn ?
                            <li className="dropdown text-center">
                                <a data-toggle="dropdown" className="dropdown-toggle">
                                    <img alt="" src="img/avatar-2.jpg" className="img-circle profile-img thumb-sm" />
                                    <span className="username">John Deo </span> <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu pro-menu fadeInUp animated" tabIndex="5003" style={{ "overflow": "hidden", "outline": "none" }}>
                                    <li><Link to="/"><i className="fa fa-briefcase"></i>Profile</Link></li>
                                    <li><Link to="/"><i className="fa fa-cog"></i> Settings</Link></li>
                                    <li><Link to="/"><i className="fa fa-bell"></i> Friends <span className="label label-info pull-right mail-info">5</span></Link></li>
                                    <li><a onClick={this.logOut}><i className="fa fa-sign-out"></i> Log Out</a></li>
                                </ul>
                            </li>
                            :
                            <li className="dropdown text-center">
                                <a data-toggle="dropdown" className="dropdown-toggle">
                                    <span className="username">เข้าสู่ระบบ</span> <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu pro-menu fadeInUp animated" tabIndex="5003" style={{ "overflow": "hidden", "outline": "none" }}>
                                    <li><Link to="login"><i className="fa fa-child"></i> Login</Link></li>
                                    <li><Link to="signup"><i className="fa fa-user-plus"></i> Sign up</Link></li>
                                </ul>
                            </li>
                        }
                    </ul>
                </nav>
            </header>
        )
    }
}

function mapStateToProps(state) {
    const { loggedIn = false, token = "" } = state.authentication
    return {
        loggedIn,
        token
    }
}
export default connect(mapStateToProps)(Navbar)