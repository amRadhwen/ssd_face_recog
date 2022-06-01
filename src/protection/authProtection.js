import React from "react";
import { Redirect } from "react-router-dom";

export const isAuth = WrappedComponent => props => {
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

    return (
        token ? (<Redirect to="/home" />) : (<WrappedComponent {...props}/>)
    )
}

export const needAuth = WrappedComponent => props => {
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

    return (
        token ? (<WrappedComponent {...props}/>) : (<Redirect to="/" />)
    )
}
