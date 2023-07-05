import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import { createBrowserRouter, Outlet , RouterProvider } from "react-router-dom";
import About from "./components/About";
import SignUp from "./components/SignUp";
import AddListing from "./components/AddListing";


const AppLayout = () =>{
    return(
        <React.Fragment>
        <Navbar/>
        <Outlet />
        </React.Fragment>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element : <AppLayout />,
        children:[
            {
                path: "/",
                element : <Body/>
            },
            {
                path: "/about",
                element : <About/>
            },
            {
                path: "/signup",
                element : <SignUp/>
            },
            {
                path: "/listings",
                element : <AddListing />
            },
        ],
    },
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);