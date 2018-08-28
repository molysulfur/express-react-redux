import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

import { userActions } from "../../actions/userActions";

const withAuth = (ComponentAuth) => {

    return class ComponentWithAuth extends Component {
        constructor(props) {
            super(props)
            this.state = {
                loggedIn: false,
                token: ""
            }
        }

        componentWillMount() {
            this.setState({
                loggedIn: this.props.loggedIn,
                token: this.props.token
            });
            this.props.dispatch(userActions.check_token(this.props.token))
        }

        componentWillReceiveProps(nextProps) {
            this.setState({
                loggedIn: nextProps.loggedIn,
                token: nextProps.token
            });
        }


        render() {
            if (this.state.loggedIn === false || this.state.loggedIn === undefined) {
                return <Redirect to="login" />
            }
            console.log(this.state)
            return <ComponentAuth />
        }
    }
}

export default withAuth