import React , {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin} from '../store/authSlice'
import {Logo, Input, Button} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from "react-hook-form"

function LoginComp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit, formState} = useForm()
    const [error, setError] = useState("")

    const login = async({email, password}) => {
        setError("")
        try {
            const session = await authService.login(email, password)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
    
  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-color3 rounded-xl p-10 border-2 border-color4`}>
        <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
            </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-color2">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-color2">
            Don&apos;t have any account?&nbsp;
            <Link
                to="/signup"
                className="font-medium text-primary transition-all duration-200 hover:underline hover:text-color1"
            >
                Sign Up
            </Link>
        </p>
        {error && <p className="text-red-700 mt-8 text-center font-semibold">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                className={formState.errors.email ? "border-b-4 border-b-red-600": ""}
                type="email"
                required
                {...register("email", {
                    required: true,
                    pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Email address must be a valid address"
                    }
                })}
                />
                {formState.errors.email && <p className="text-red-700 mt-8 text-center font-semibold">{formState.errors.email.message}</p>}

                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                required
                className={formState.errors.password ? "border-b-4 border-b-red-600": ""}
                {...register("password", {
                    required: true,
                    minLength: {
                        value: 8,
                        message: "Password length should be 8 or more"
                    },
                    maxLength: {
                        value: 20,
                        message: "Password length should be 20 or less"
                    }
                })}
                />
                {formState.errors.password && <p className="text-red-700 mt-8 text-center font-semibold">{formState.errors.password.message}</p>}

                <Button type="submit" className="w-full" disabled = {formState.isSubmitting}>
                    Sign in
                </Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default LoginComp