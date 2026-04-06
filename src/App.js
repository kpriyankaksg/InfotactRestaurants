import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Provider, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import './App.css';
import AboutUs from './components/AboutUs';
import Body from './components/Body';
import Cart from "./components/Cart";
import ContactUs from './components/ContactUs';
import CustomerResMenu from './components/CustomerResMenu';
import Login from './components/Login';
import MainContainer from './components/MainContainer';
import Menu from './components/Menu';
import Profile from "./components/Profile";
import Register from "./components/Register";
import appStore from './utils/appStore';

// import axios from 'axios';


function App() {
 

//    //Mongodb configuration
//   const DB_URL= process.env.REACT_APP_atlas_URL;
//   console.log(DB_URL);
//   mongoose.connect(DB_URL);
//   // In a React component or service
// const fetchUsers = async () => {
//   try {
//     const response = await axios.get('http://localhost:5000/api/users'); // API endpoint
//     console.log(response.data); // Array of user objects matching the schema
   
//   } catch (error) {
//     console.error('Error fetching users:', error);
//   }
// };
const ProtectedRoute = ({ children }) => {
  const user = useSelector((appStore) => appStore.user.user);
  return user ? children : <Navigate to="/" />;
};


const appRouter= createBrowserRouter([
  {
    path:"/",
    element: <Login />
  },
  {
    path:"/register",
    element:<Register />
  },
  {
    path:"/body",
    element:(
      <ProtectedRoute >
         <Body />
      </ProtectedRoute>
    ),
    children:[
      {
        path:"mainContainer",
        element:<MainContainer/>
      },
      {
        path:"profile",
        element: <Profile />
      },
      {
        path:"contactUs",
        element:<ContactUs />
      },
      {
        path:"aboutUs",
        element:<AboutUs />
      },
       {
        path:"menu",
        element:<Menu />
      },
      {
        path:"cart",
        element:<Cart />
      },
      {
        path:"restaurant/:resId",
        element:<CustomerResMenu />
      }
    ]
  }
  
  
]

)

  return (
    <Provider store={appStore}>
    <div>
     <RouterProvider router={appRouter} />
    </div>
    </Provider>
    
  )

}

export default App;
