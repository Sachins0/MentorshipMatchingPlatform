import React from 'react'
import Login from '../pages/Login'
import Browse from './Browse'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Profile from '../pages/Profile'
import CreateProfile from '../pages/CreateProfile'
import Connection from '../pages/Connection'
import Myconnections from '../pages/Myconnections'


const Body = () => {
    const appRouter=createBrowserRouter([ //write routes in App.js
        {
            path:"/",
            element:<Login/>
        },
        {
            path:"/browse",
            element:<Browse/>,
            children: [
                {
                    path:"/browse/profile",
                    element:<Profile/>
                },
                {
                    path:"/browse/createProfile",
                    element:<CreateProfile/>
                },
                {
                    path:"/browse/connect",
                    element:<Connection/>
                },
                {
                    path:"/browse/myconnection/:id",
                    element:<Myconnections/>
                },
            ]
            

        },
        
    ])

    
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body