import React from 'react'
import { useSelector } from 'react-redux';

const WithGuard = (Components) => {
  // Method 1:
  // return (props) => {
  //   console.log(props); // my name
  //   return <Components { ...props } age="35" />; // { path: "post/add", element: <AddPost name="my name" /> },
  // }
  // Methode 2:
  const Wrapper = (props) => {
    const { isLoggedIn } = useSelector(state => state.auth);
    return isLoggedIn ? <Components { ...props } /> : <div>Please log in first!</div>; // { path: "post/add", element: <AddPost name="my name" /> },
  };
  return Wrapper;
}

export default WithGuard