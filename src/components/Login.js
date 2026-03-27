import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { BackGround_IMG_URL } from "../utils/constants";
import { setUser } from "../utils/userSlice";

const Login=()=>{
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const navigate= useNavigate();
  const dispatch= useDispatch();

  const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
           const response = await axios.post("http://localhost:5000/api/auth/login",{
            email, password
          });
         
          console.log(response.data);
          const result= response.data;
          dispatch(setUser(result));
          
          localStorage.setItem("useName",result.user.name);
          localStorage.setItem("useEmail",result.user.email);
          localStorage.setItem("useEmail",result.user.role);
          if(result.token){
            console.log("entered into token");
            localStorage.setItem("token", result.token);
            alert("Login Successfully.")
            navigate("/body/mainContainer");
          }
          else{
            console.log("entered into else");
            alert(result.error);
          }
        }
        catch (error) {
          alert("Invalid Credentials.");
         console.error(error.response.data); 
  }
        // const result= await fetch("http://localhost:5000/api/auth/login",{
        //         method:"POST",
        //         body:{email, password},
        //         headers:{"Content-type":"application/json"}
        // });
        //     const data=await result.json();
        //       console.log(data);
        //     if(data.token){
        //       localStorage.setItem("token", data.token);
        //       alert("Login Successfully");
        //       navigate("/body")

        //     }
        //     else{
        //       alert(data.error);
        //     }

  }

  return(
    <div>
         <div className="absolute h-screen object-cover">
          <img  className="h-screen w-screen object-cover bg-opacity-100" src={BackGround_IMG_URL} alt="img" />
         </div>
     
    <form  className="absolute bg-black flex flex-col  p-8 w-3/12 my-20 mx-auto right-0 left-0  ">
      <h1 className="text-bold text-white m-2 p-2 text-3xl">Sign In</h1> 
      <input placeholder="Email Id" className=" font-bold m-2 p-4 border border-thin border-white text-white rounded-sm bg-black" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
      <input placeholder="Password" className=" font-bold m-2 p-4 border border-thin border-white text-white rounded-sm bg-black" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
      <button className="m-2 p-4 bg-red-500 text-white font-xl font-bold rounded-sm" onClick={handleSubmit}>Login</button>
      <p className="font-bold text-white mx-4">or<label className="mx-4 text-red-500 cursor-pointer">
       <Link to={"/register"}>Create an Account</Link> </label> </p>
    </form>
    </div>
  )
}

export default Login;