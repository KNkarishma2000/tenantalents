'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Google from '../../../assets/google.jpg';
import { Eye, EyeOff } from 'lucide-react';
import ForgotPassword from '../forgot-password/page';

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
   const [passwordVisible, setPasswordVisible] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    router.push('/dashboard');
  };

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="w-full  flex items-center justify-center  px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
          

          {/* Submit Button */}
            <div className="flex justify-between items-center my-2">
                <label className='flex items-center text-gray-600'>
                    <input type="checkbox" className='mr-2' checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                  Remember Me
                </label>
                <Link href={'/ForgotPassword'} className='text-blue-500 text-sm' >Forgot Password?</Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-[var(--primary)] text-white hover:opacity-90 transition"
          >
            Login
          </button>
          {serverError && (
            <p className='text-red-500 text-sm mt-2'>{serverError}</p>
          )}
        </form>

        {/* Divider */}
        <div className="flex items-center my-5 text-gray-400 text-sm">
          <div className="flex-1 border-t border-gray-300" />
          <span className="px-3">or Sign in with Email</span>
          <div className="flex-1 border-t border-gray-300" />
        </div>

        {/* Google Login */}
        <div className="googlesignin mt-4 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 cursor-pointer hover:bg-gray-100 transition">
          <Image src={Google} alt="Google Logo" width={24} height={24} />
          <span className="text-sm text-gray-700">Sign in with Google</span>
        </div>

        {/* Signup Link */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
