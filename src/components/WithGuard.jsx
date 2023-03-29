// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";


const WithGuard = ({ children }) => {
    const { isLoggedIn } = useSelector(state => state.auth);

    // Methode 1:
    // const navigate = useNavigate();

    // useEffect(() => {
    //    if (!isLoggedIn) navigate("/");
    // }, [isLoggedIn, navigate]);

    // Methode 2:
    // return isLoggedIn ? children : <div>Please log in first!</div>;

    // Methode 3:
    // we can send props at run time with children
    const newComponent = React.cloneElement(children, { title: "my title", message: "my message" });
    return isLoggedIn ? newComponent : <div>Please log in first!</div>;
    //Note : we can catch our props in AddPost components as below.
    // ...
    // const AddPost = (props) => {
    //     console.log("props from WithGuard : ", props);
    //     console.log("title from WithGuard : ", props.title); // my title
    //     console.log("message from WithGuard : ", props.message); // my message
    // ...

};

export default WithGuard;