"use server"
// This file handles authentication actions for the server-side.
// It uses the 'next/navigation' package to redirect users after successful login.

import { redirect } from "next/navigation"

export const Login = async () =>{
    redirect("/dashboard")
}
