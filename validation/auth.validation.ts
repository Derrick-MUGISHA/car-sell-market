import { object, string } from "zod";




// signup form

export const signupSchema = object({
    name: string().min(1, {
        message: 'Name is required'
    }),
    email: string().email({
        message: 'please enter a valid email address'
    })
    .min(1, {
        message: 'Email is required'
    }),
    password: string().min(1, {
        message: 'Password is required'
    }),
    confirmPassword: string().min(1, {
        message: 'Confirm Password is required'
    }),
});

// login form


export const loginSchema = object({
    
    email: string().email({
        message: 'please enter a valid email address'
    })
    .min(1, {
        message: 'Email is required'
    }),
    password: string().min(1, {
        message: 'Password is required'
    }),
});