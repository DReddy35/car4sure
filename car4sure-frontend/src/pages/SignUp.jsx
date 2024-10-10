// import { Link, Head, useForm, router } from "@inertiajs/react";
import { useState } from "react";
// import useForm from "../hooks/useForm";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


//import PhoneNumberInput from "@/Components/PhoneNumberInput";

export default function SignUp() {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
      });
    // const [passwordsMatch, setPasswordsMatch] = useState(true);

    const navigate = useNavigate(); // Initialize the navigate hook

    // const [fieldValidity, setFieldValidity] = useState({
    //     email: false, // Assume fields are invalid by default if they are required
    //     // Initialize validity for other fields as needed
    //     phone: false,
    //     fullname: false,
    //     password: false,
    //     password_confirmation: false,
    // });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    // const handleOnChange = (e, isValid) => {
    //     // // Assuming you're using a state named `data` and a setter named `setData`
    //     // //setData({ ...data, [e.target.name]: e.target.value });
    //     // // Optionally handle validation status with `isValid`

    //     // const { name, value } = e.target;
    //     // setData({ ...data, [name]: value });
    //     // // Update errors state based on validation result
    //     // setFieldValidity({ ...fieldValidity, [name]: isValid });

    //     // if (name === 'password' || name === 'password_confirmation') {
    //     //     setPasswordsMatch(data.password === data.password_confirmation);
    //     // }

    //     const { name, value } = e.target;

    //     // Update state with the new value
    //     setData((prevData) => {
    //         const newData = { ...prevData, [name]: value };

    //         // Check if passwords match
    //         if (name === "password" || name === "password_confirmation") {
    //             setPasswordsMatch(
    //                 newData.password === newData.password_confirmation
    //             );
    //         }

    //         return newData;
    //     });

    //     // Update errors state based on validation result
    //     setFieldValidity((prevValidity) => ({
    //         ...prevValidity,
    //         [name]: isValid,
    //     }));
    // };

    // const allFieldsValid = () => {
    //     return Object.values(fieldValidity).every((isValid) => isValid);
    // };

    const handleSubmit = async () => {
        console.log(formData);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
            localStorage.setItem('authToken', response.data.token);
            // setAuth(true);
            console.log('Login Successful');
            navigate('/login');
          } catch (error) {
            console.error('Login Error:', error.response ? error.response.data : error.message);
            alert('Login Failed');
          }

       
    };

    return (
        // <GuestLayout>
            <div>

<div className="px-5 relative">
    {/* <div className="hidden xl:block absolute top-0 left-0">
        <img
            className="w-full h-auto rounded-[20px] max-w-[500px] mx-auto -ml-16"
            src="/images/sign-up-1.jpg"
            alt="Main image"
        />
        <img
            className="w-full h-auto rounded-[20px] max-w-[300px] mx-auto mt-16"
            src="/images/sign-up-2.jpg"
            alt="Secondary image"
        />
    </div> */}

    <div className="mx-auto w-1/3 items-center">
        {/* <button
            onClick={handleGoogleSignUp}
            className="w-full h-10 px-6 py-2.5 rounded-md border border-slate-500 justify-center items-center gap-2.5 inline-flex mt-8"
        >
            <div className="w-5 h-5 relative">
                <svg viewBox="0 0 48 48">
                    <clipPath id="g">
                        <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
                    </clipPath>
                    <g className="colors" clip-path="url(#g)"></g>
                    <g className="colors" clipPath="url(#g)">
                        <path fill="#FBBC05" d="M0 37V11l17 13z" />
                        <path
                            fill="#EA4335"
                            d="M0 11l17 13 7-6.1L48 14V0H0z"
                        />
                        <path
                            fill="#34A853"
                            d="M0 37l30-23 7.9 1L48 0v48H0z"
                        />
                        <path
                            fill="#4285F4"
                            d="M48 48L17 24l-4-3 35-10z"
                        />
                    </g>
                </svg>
            </div>
            <div className="text-indigo-900 text-base font-normal font-Poppins leading-tight">
                Continue with Google
            </div>
        </button>

        <div className="flex justify-center items-center gap-2 mt-6">
            <div className="flex-grow h-px bg-slate-500"></div>
            <div className="text-indigo-900 text-base font-medium font-['Plus Jakarta Sans']">
                or
            </div>
            <div className="flex-grow h-px bg-slate-500"></div>
        </div> */}

<InputField
            label="Full Name"
            id="name"
            name="name"
            value={formData.name}
            type="text"
            onChange={handleOnChange}
            required
        />

        <InputField
            label="Email Address"
            id="email"
            name="email"
            value={formData.email}
            type="email"
            onChange={handleOnChange}
            required
        />

        

        <InputField
            label="Password"
            id="password"
            name="password"
            value={formData.password}
            type="password"
            onChange={handleOnChange}
            required
        />


        {/* {!passwordsMatch && (
            <p className="text-sm text-red-600">
                Passwords do not match
            </p>
        )} */}

        <div className="mt-8">
            <SubmitButton
                buttonText="Sign Up"
                onClick={handleSubmit}
            />
        </div>

        {/* <div className="mt-12 text-center">
            Already have an account?{" "}
            <Link className="underline" href={route("login")}>
                Login
            </Link>
        </div> */}
    </div>
</div>
            </div>
        // </GuestLayout>
    );
}
