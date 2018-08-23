import React, { Component } from "react";
import { connect } from "react-redux";

class IndexPage extends Component {
    render() {
        return (
            <div>
                <p>{this.props.loggedIn && this.props.token}</p>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { loggedIn, token } = state.authentication
    return {
        loggedIn, 
        token
    }
}
export default connect(mapStateToProps)(IndexPage)