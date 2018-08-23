import React, { Component } from "react";
import Login from "./Login";
class LoginPage extends Component {
    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4" style={{ margin: "0 auto" }}>
                        <h1 className="text-center">Login</h1>
                        <Login />
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage