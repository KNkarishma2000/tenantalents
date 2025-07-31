// this has been taken from the timestamp 4:45:00 (the 45 minutes before has been skipped will be handled by Karishma)
"use client";
import React, { useRef, useState } from 'react'
import { useForm } from "react-hook-form"
import {useMutation} from "@tanstack/react-query"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from "react-hot-toast";

// Update the path below to the correct location of GoogleButton in your project
import axios, { AxiosError } from 'axios';

type FormData = {
    email:string;
    password: string
};

const ForgotPassword = () => {

   
    const [serverError, setServerError] = useState<string | null>();

    const [step, setStep] = useState<"email"| "otp" |"reset">("email");

    const [otp, setOtp] = useState(["","","",""])

    const [userEmail, setUserEmail] = useState<string | null>(null)

     const [canResend, setCanResend] = useState(true)

    const [timer, setTimer] = useState(60)

     const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const router = useRouter();

    const {register, handleSubmit, formState:{errors}} = useForm<FormData>();

    
    const startResendTimer = () => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if(prev < 1 || prev == 1){ 
                    clearInterval(interval)
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const requestOtpMutation = useMutation({
        mutationFn: async ({email}:{email:string}) => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVICE_URI}/api/forgot-password-user`, 
                {email},
            );
            return response.data;
        },
        onSuccess: (_, {email}) => { 
            setUserEmail(email);
            setStep("otp");
            setServerError(null);
            setCanResend(false);
            startResendTimer()
        },
        onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as {message?: string})?.message || "Invalid OTP try again..";
            setServerError(errorMessage);
        },
    });

    const verifyOtpMutation = useMutation({
        mutationFn: async () => {
            if(!userEmail) return;
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/verify-forgot-password-user`, 
                {email: userEmail, otp:otp.join("")},
            );
            return response.data;
        },
         onSuccess: () => { 
            
            setStep("reset");
            setServerError(null);
        },
        onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as {message?: string})?.message || "Invalid OTP try again..";
            setServerError(errorMessage);
        },
    });

    const resetPasswordMutation = useMutation({
        mutationFn: async ({password}: {password:string}) => {
            if(!userEmail) return;
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/reset-password-user`,
                {email:userEmail, newPassword:password}
            );
            return response.data;
        },
        onSuccess: () => { 
            
            setStep("email");
            toast.success("password reset successfull...");
            setServerError(null);
            router.push('/login')
        },
         onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as {message?: string})?.message || "Failed to Reset Password, Please Try Again..";
            setServerError(errorMessage);
        },
    });

        //OTP Handling: 
    const handleOtpChange= (index:number, value:string) => {
        if(!/^[0-9]?$/.test(value)) return;
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if(value && index < inputRefs.current.length-1)
            {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index:number, e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Backspace" && !otp[index] && index > 0){
            inputRefs.current[index-1]?.focus();
        }
    };

    const onSubmitEmail = ({email}:{email:string}) => {
        requestOtpMutation.mutate({email});
    };

    const onSubmitPassword = ({password}: {password:string}) => {
        resetPasswordMutation.mutate({password});
    };

   

  return (
    <div className='w-full py-10 min-h-[85vh] bg-[#f1f1f1]'>
        <h1 className='text-4xl font-poppins font-semibold text-black text-center'>
            Forgot Password
        </h1>
        <p className='text-center fomt-medium text-lg py-3 text-[#00000099]'>
            Home . Password Reset
        </p>
        <div className='w-full flex justify-center'>
            <div className='md:w-[480px] p-8 bg-white shadow rounded-lg'>
                
                {step === "email" && (
                    <>
                        <h3 className='text-3xl font-semibold text-center mb-2'>
                        Login to Tentalents Marketplace
                    </h3>
                    <p className='text-center text-gray-500 mb-4'>
                        Go Back to?{" "}
                        <Link href={"/login"} className='text-teal-600'>
                        <span>Login Here!</span>
                        </Link>
                    </p>

                    {/* <div className='flex items-center my-5 text-gray-400 text-sm'>
                        <div className='flex-1 border-t border-gray-300'/>
                        <span className='px-3'>Or Sign-in with Email.</span>
                        <div className='flex-1 border-t border-gray-300'/>
                    </div> */}



                    <form onSubmit={handleSubmit(onSubmitEmail)}>
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

                        <button disabled={requestOtpMutation.isPending}  className='w-full text-lg cursor-pointer mt-4 bg-black text-white py-2 rounded-lg' type='submit'>
                            {requestOtpMutation.isPending? "OTP Requested.." :"Submit"}
                        </button>

                        {serverError && (
                            <p className='text-red-500 text-sm mt-2'>{serverError}</p>
                        )}
                    </form>
                </>
                )}

                {step === "otp" && (
                    <>
                        <h3 className='text-xl font-semibold text-center mb-4'>Enter OTP</h3>
                        <div className='flex justify-center gap-6'>
                            {otp?.map((digit, index) => (
                            <input key={index} type='text' ref={(el)=> {
                                if(el) inputRefs.current[index] = el;
                            }}

                                maxLength={1}
                            className='size-12 text-center border border-teal-400 outline-none !rounded'
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e)=> handleOtpKeyDown(index, e)}
                            />
                            ))}
                            </div>

                            <button className='w-full mt-4 text-lg  cursor-pointer py-2 rounded-md  border border-teal-500 text-white bg-teal-600'  
                            disabled={verifyOtpMutation.isPending} onClick={() => verifyOtpMutation.mutate()}>
                                {verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
                            </button>
                
                                {canResend ? (
                                <button className='text-md  cursor-pointer py-2 rounded-md  border border-teal-500 text-black' 
                                onClick={() => {
                                    if (userEmail) {
                                        requestOtpMutation.mutate({ email: userEmail });
                                    }
                                }}
                                >
                                Resend OTP
                                </button>
                                ) : (
                                    <p className='text-sm mt-4 text-center'>
                                        `Resend OTP In ${timer}s`
                                    </p>
                                 )}
                            { serverError && (
                                <p className='text-red-500 text-sm mt-2'>{serverError}</p>
                        )}
                    </>
                )}

                {step === "reset" && (
                    <>
                        <h3 className='text-xl font-semibold text-center mb-4'>
                            Reset Password
                        </h3>

                        <form onSubmit={handleSubmit(onSubmitPassword)}>
                            <label className='block text-gray-700 mb-1'>New Password</label>
                            <input type="password" placeholder='Password of 8 Characters' 
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
                                 {errors.password && (
                                    <p className='text-red-500 text-sm'>{String(errors.password.message)}</p>
                                )}

                                <button type='submit' disabled={resetPasswordMutation?.isPending} 
                                className='w-full mt-4 text-lg cursor-pointer py-2 bg-teal-600 text-white border border-teal-300 rounded-md' >
                                    {resetPasswordMutation?.isPending? "Resetting..": "Reset Password"}
                                </button>
                                 {serverError && (
                                    <p className='text-red-500 text-sm'>{serverError}</p>
                                )}
                        </form>
                    </>
                )}

                
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword