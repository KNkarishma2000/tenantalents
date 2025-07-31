'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Google from '../../../assets/google.jpg';
import { Eye, EyeOff } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

type FormData = {
  email: string;
  password: string;
};

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [rememberMe, setRememberMe] = useState(true);
  const [canResend, setCanResend] = useState(true);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [showOtp, setShowOtp] = useState(false);
  const [userData, setUserData] = useState<FormData | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const signupMutation = useMutation({
    mutationFn:async (data:FormData) =>{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/user-registration`,
        data
      );
      return response.data;
    },
    onSuccess:(_, formData) =>{
      console.log("Signup success",formData);
      setUserData(formData)
      setShowOtp(true);
      setCanResend(false);
      setTimer(60);
      startResendTimer();

    }, onError: (error) => {
    console.error("Signup failed", error);
  }
  })
  const verifyOtpMutation = useMutation({
    mutationFn:async() =>{
      if(!userData) return;
      const response = await axios.post (`${process.env.NEXT_PUBLIC_SERVER_URI}/api/verify-user`,
      {
        ...userData,
        otp:otp.join(""),

      })
      return response.data;
    },
    onSuccess:() =>{
      router.push("/login");
    }
  })
  const startResendTimer = () =>{
    const interval = setInterval(() =>{
      setTimer((prev) =>{
        if (prev <= 1){
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev -1 ;
      })

    }, 1000);
  }
  const onSubmit = (data: FormData) => {
    signupMutation.mutate(data);
    console.log(data);
    // Example: setUserData(data); setShowOtp(true);
  };

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const resendOtp = () => {
   ;

  };

  return (
    <div className="w-full flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

        {!showOtp ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.email.message)}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {passwordVisible ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.password.message)}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center text-gray-600">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember Me
              </label>
              <Link
                href="/forgot-password"
                className="text-[var(--primary)] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={signupMutation.isPending}
              className="w-full py-2 rounded-lg bg-[var(--primary)] text-white hover:opacity-90 transition"
            >
                {signupMutation.isPending ? " Signing Up ...": "SignUp"}
            </button>
         
            
          </form>
        ) : (
          <div>
            <h3 className="text-center mb-4 font-medium text-lg">Enter OTP</h3>
            <div className="flex justify-center gap-4 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handleOtpChange(index, e.target.value)
                  }
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-12 h-12 text-center border border-gray-300 rounded-md outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--primary)] transition"
                />
              ))}
            </div>
            <button  disabled={verifyOtpMutation.isPending}
            onClick={() => verifyOtpMutation.mutate()}
            className="w-full py-2 rounded-lg bg-[var(--primary)] text-white hover:opacity-90 transition mb-4">
              {verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
            </button>
            <p className="text-center text-sm">
              {canResend ? (
                <button
                  onClick={resendOtp}
                  className="text-[var(--primary)] hover:underline"
                >
                  Resend OTP
                </button>
              ) : (
                `Resend OTP in ${timer}s`
              )}
            </p>
            {
              verifyOtpMutation?.isError &&
              verifyOtpMutation.error instanceof AxiosError &&(
                <p className='text-red-500 text-sm mt-2'>
                  {verifyOtpMutation.error.response?.data?.message || verifyOtpMutation.error.message}
                </p>

              )
            }
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center my-5 text-gray-400 text-sm">
          <div className="flex-1 border-t border-gray-300" />
          <span className="px-3">or</span>
          <div className="flex-1 border-t border-gray-300" />
        </div>

        {/* Google Login */}
        <div className="googlesignin mt-4 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 cursor-pointer hover:bg-gray-100 transition">
          <Image src={Google} alt="Google Logo" width={24} height={24} />
          <span className="text-sm text-gray-700">Sign up with Google</span>
        </div>

        {/* Switch to Login */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-[var(--primary)] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
