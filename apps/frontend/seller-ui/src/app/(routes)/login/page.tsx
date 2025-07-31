// this has been taken from the timestamp 4:45:00 (the 45 minutes before has been skipped will be handled by Karishma)
"use client";
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import {useMutation} from "@tanstack/react-query"
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Eye, EyeOff } from 'lucide-react';
// Update the path below to the correct location of GoogleButton in your project

import axios, { AxiosError } from 'axios';

type FormData = {
    email:string;
    password: string
};

const Login = () => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [serverError, setServerError] = useState<string | null>();
    const [remeberMe, setRememberMe] = useState(false);

    const router = useRouter();

    const {register, handleSubmit, formState:{errors}} = useForm<FormData>();

    const loginMutation = useMutation({
        mutationFn: async(data:FormData) => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/login-user`, 
                data,
                {withCredentials:true}
            );
            return response.data;
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSuccess: (data) => {
            setServerError(null);
            router.push('/');
        },
        onError: (error:AxiosError) =>{
            const errorMessage = (error.response?.data as {message?: string})?.message || "Invalid Credentials";
            setServerError(errorMessage);
        },
    });

    //implementing Login Functioanlity at frontend for Consumer
    const onSubmit = (data:FormData) => {
        //login implementation
        loginMutation.mutate(data);
    }


  return (
    <div className='w-full py-10 min-h-[85vh] bg-[#f1f1f1]'>
        <h1 className='text-4xl font-poppins font-semibold text-black text-center'>
            Sign-in
        </h1>
        <p className='text-center fomt-medium text-lg py-3 text-[#00000099]'>
            Home . Sign-In
        </p>
        <div className='w-full flex justify-center'>
            <div className='md:w-[480px] p-8 bg-white shadow rounded-lg'>
                <h3 className='text-3xl font-semibold text-center mb-2'>
                    Login to Tentalents Marketplace
                </h3>
                <p className='text-center text-gray-500 mb-4'>
                    Dont have an Account? {" "}
                    <Link href={"/signup"} className='text-blue-500'>
                    <span>Register Here.</span>
                    </Link>
                </p>

                <div className='flex items-center my-5 text-gray-400 text-sm'>
                    <div className='flex-1 border-t border-gray-300'/>
                    <span className='px-3'>Or Sign-in with Email.</span>
                    <div className='flex-1 border-t border-gray-300'/>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className='block text-gray-700 mb-1'>Email</label>
                    <input type="email" placeholder='support@tetalents.com' 
                    className='w-full p-2 border-gray-300 outline-0 rounded-sm mb-1'
                    {...register("email", {
                        required:"Email is required",
                        pattern:{
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message:"Email is Not Valid, Please put a valid email",
                        }
                    })}
                    />
                    {errors.email && (
                        <p className='text-red-500 text-sm'>{String(errors.email.message)}</p>
                    )}

                    <label className='block text-gray-700 mb-1'>Password</label>
                    <div className="realtive">
                         <input type={passwordVisible ? "text" : "password"} placeholder='Password of 8 Characters' 
                    className='w-full p-2 border-gray-300 outline-0 rounded-sm mb-1'
                   {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                    },
                    pattern: {
                        // Now allows letters, digits, AND underscores:
                        value: /^[A-Za-z0-9_]+$/,
                        message: `Password must be alphanumeric and can include underscores no "-" or "." `,
                    },
                    })}
                    />

                    <button type="button" className='absolute inset-y-0 right-3 flex items-center text-gray-700' 
                    onClick={()=> setPasswordVisible(!passwordVisible)}>
                        {passwordVisible ?<Eye/> : <EyeOff/>}
                    </button>
                    {errors.password && (
                        <p className='text-red-500 text-sm'>{String(errors.password.message)}</p>
                    )}
                    </div>
                    <div className='flex justify-between items-center my-4'>
                        <label className='flex items-center text-gray-600'>
                            <input type="checkbox" className='mr-2' checked={remeberMe} onChange={()=>{setRememberMe(!remeberMe)}}/>
                            Remember Me :{")"}
                        </label>
                        <Link href={"/forgot-password"} className='text-blue-500 text-sm'>
                            Forgot Password 😅
                        </Link>
                    </div>

                    <button disabled={loginMutation.isPending} className='w-full text-lg cursor-pointer mt-4 bg-black text-white py-2 rounded-lg' type='submit'>
                         {loginMutation.isPending? "Logging In..." : "Sign-in +_+"}
                    </button>

                    {serverError && (
                        <p className='text-red-500 text-sm mt-2'>{serverError}</p>
                    )}
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login