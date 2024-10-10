// import { Link, Head, useForm, router } from "@inertiajs/react";
import  { useState } from "react";
// import useForm from "../hooks/useForm";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Initialize the navigate hook

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleLogin = async (e) => {
    if (e)
      e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login_submit', formData);
      localStorage.setItem('authToken', response.data.token);
      // setAuth(true);
      alert('Login Successful');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login Error:', error.response ? error.response.data : error.message);
      alert('Login Failed');
    }
  };



  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-gray-50">
          <body class="h-full">
          ```
        */}
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign In to Car4Sure
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <InputField
                  label="Email Address"
                  id="email"
                  name="email"
                  value={formData.email}
                  type="email"
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div>
                <InputField
                  label="Password"
                  id="password"
                  name="password"
                  value={formData.password}
                  type="password"
                  onChange={handleOnChange}
                  required
                />
              </div>



              <div>
                <SubmitButton
                  buttonText="Login"
                  onClick={handleLogin}
                >
                </SubmitButton>
              </div>

              <div className="mt-6 w-full">
                <a href="/signup" className="font-medium text-indigo-300 hover:text-indigo-500 text-center">
                  Dont have an account? Sign up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
