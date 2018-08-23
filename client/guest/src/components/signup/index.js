import React, { Component } from "react";
import Signup from "./Signup";
class SignupPage extends Component {
    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4" style={{ margin: "0 auto" }}>
                        <h1 className="text-center">Sign up</h1>
                        <Signup />
                    </div>
                </div>
            </div>
        )
    }
}

export default SignupPage