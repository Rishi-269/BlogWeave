import React, {useState} from 'react'
import authService from '../appwrite/auth.js'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice.js'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function SignupComp() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit, formState} = useForm()

    const create = async({email, password, name}) => {
        setError("")
        try {
            const userData = await authService.createAccount(email, password, name)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-color3 rounded-xl p-10 border-2 border-color4`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-color2">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-color2">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline hover:text-color1"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-700 mt-8 text-center font-semibold">{error}</p>}

            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>
                    <Input
                    label="Full Name: "
                    placeholder="Enter your full name"
                    className={formState.errors.name ? "border-b-4 border-b-red-600": ""}
                    required
                    {...register("name", {
                        required: true,
                        pattern: {
                            value: /^[A-Za-z\s]{3,30}$/,
                            message: "Name must be 3-30 characters and contain only letters and spaces",
                        }
                    })}
                    />
                    {formState.errors.name && <p className="text-red-700 mt-8 text-center font-semibold">{formState.errors.name.message}</p>}

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
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/,
                            message: "8-20 characters, with 1 uppercase, 1 lowercase, and 1 number required"
                        }
                    })}
                    />
                    {formState.errors.password && <p className="text-red-700 mt-8 text-center font-semibold">{formState.errors.password.message}</p>}

                    <Button type="submit" className="w-full" disabled = {formState.isSubmitting}>
                        Create Account
                    </Button>
                </div>
            </form>
        </div>
        
    </div>
  )
}

export default SignupComp