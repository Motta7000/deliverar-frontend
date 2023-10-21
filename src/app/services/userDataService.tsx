"use client"
export const UpdateUser = async (newUser: { email: string; name: string; password: string; profilePicture: string; }) => {
    try {
        const res = await fetch("http://localhost:8000/api/user", {
            method: 'PUT',
            body: JSON.stringify(newUser),
            headers: {"Content-Type": "application/json"}
        })
        return await res.json()
    } catch (e) {
        console.error("Error:", e);
        if (e instanceof Response) {
            console.error("Status:", e.status);
            console.error("Status Text:", e.statusText);
        }
    }
}

export const DeleteUser = async (email: any) => {
    try {
        const res = await fetch(`http://localhost:8000/api/user/${email}`, {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"}
        })
        return await res.json()
    } catch (e) {
        console.log("error", e)
    }
}

export const AddUser = async (newUser: any) => {
    try {
        const res = await fetch("http://localhost:8000/api/user", {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {"Content-Type": "application/json"}
        })
        return await res.json()
    } catch (e) {
        console.log("error", e)
    }
}

export const ResetPassword = async (email: any) => {
    try {
        const res = await fetch(`http://localhost:8000/api/user/reset/${email}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"}
        })
        return await res.json()
    } catch (e) {
        console.log("error", e)
    }
}

export const LoginUser = async (credentials: any) => {
    try {
        const res = await fetch("http://localhost:8000/api/auth/login", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {"Content-Type": "application/json"}
        })
        return res.json()
    } catch (e) {
        console.log("error", e)
    }
}