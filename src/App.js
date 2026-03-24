import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';
import Body from './components/Body';
import Login from './components/Login';
import Profile from "./components/Profile";
import Register from "./components/Register";
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
    path:"/profile",
    element: <Profile />
  },
   {
    path:"/body",
    element: <Body />
  }
  
]

)

  return (
    <RouterProvider router={appRouter} />
    
  )


}

export default App;
