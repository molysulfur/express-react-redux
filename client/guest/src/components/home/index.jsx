import React, { Component } from "react";
import { connect } from "react-redux";

import withAuth from "../HoC/withAuth";

class Home extends Component {
    render() {
        return (
            <h1>Home</h1>
        )
    }

}

function mapStateToProps(state) {
    const { token, loggedIn } = state.authentication
    return {
        token,
        loggedIn
    }
}
export default connect(mapStateToProps)(withAuth(Home))