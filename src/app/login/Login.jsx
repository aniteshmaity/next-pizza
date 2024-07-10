"use client";

import { login } from '@/services/userService';
import { AuthContext } from '@/utils/authContext';
// import { login } from '@/services/userService'


import Link from 'next/link'
import { useRouter } from 'next/navigation';

import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';

const Login = () => {

  const router = useRouter();
  const { loginCxt } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({ email:"", password:"" })
console.log("logindetails",  credentials);

const handleSubmit = async (e) => {
e.preventDefault();

// valiation
if (credentials.email === "" || credentials.password == "") {
  console.log("All filed required !!");
  return;
}


try {

  const userData = await login(credentials);
  console.log("userdata",userData);
   // Save the token to localStorage
   localStorage.setItem("token", userData.token);
   console.log("Login successful, token saved to localStorage");
   if (userData.success) {
    // setCredentials({
   
    //   email: "",
    //   password: ""
  
    // });
    toast.success("Login successful!");
    loginCxt(userData.token);
    router.push("/");
   }
   else{
    toast.error(`Login failed: ${userData.message}`);
    console.log('Login failed:', userData.message);
   }
 
} catch (error) {
  console.log(error);
  // console.log(error.response.data);
  toast.error(error.response.data.message);

  
}



}
const handleChange = (e)=> {
setCredentials({...credentials,[e.target.name]:e.target.value});
}

  return (
    <>
     <div
      style={{
        height: "90vh",
        backgroundImage:
          'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
      }}
      className="flex justify-center items-center"
    >
      <div className="container w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              placeholder="Enter your email/username"
              name="email"
              onChange={handleChange}
              type="email"
              required
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              value={credentials.email}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              placeholder="*******"
              onChange={handleChange}
              name="password"
              required
              type="password"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              value={credentials.password}
            />
          </div>
          <div className="flex items-center justify-between"></div>
          <button
            type="submit"
            className="border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-blue-950 to-orange-700  hover:text-gray-100"
          >
            Log in
          </button>
          <Link href={"/signup"} style={{ all: "unset" }}>
            <button className="border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-blue-950 to-orange-700  hover:text-gray-100">
              New User?
            </button>
          </Link>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login