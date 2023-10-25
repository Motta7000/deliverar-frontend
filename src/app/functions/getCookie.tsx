"use server"
import {cookies} from 'next/headers'

export const GetCookie = async (cookieName: any) => {
    const cookieStore = cookies()
    return cookieStore.get(cookieName)
}