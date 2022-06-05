import React from "react";
import { Redirect } from "react-router-dom";

export const isAuth = WrappedComponent => props => {
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

    return (
        token ? (<Redirect to="/notifications" />) : (<WrappedComponent {...props}/>)
    )
}

export const needAuth = WrappedComponent => props => {
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

    return (
        token ? (<WrappedComponent {...props}/>) : (<Redirect to="/" />)
    )
}

export const needAdmin = WrappedComponent => props => {
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
    const admin = localStorage.getItem("admin") ? localStorage.getItem("admin") : null;

    return (
        token && admin ? (<WrappedComponent {...props}/>) : (<Redirect to="/" />)
    )
}
