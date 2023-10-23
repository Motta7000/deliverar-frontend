"use client"
export const UpdateUser = async (newUser: { email: string; name: string; password: string; profilePicture: string; }) => {
    try {
        return await fetch("http://localhost:8000/api/user", {
            method: 'PUT',
            body: JSON.stringify(newUser),
            headers: {"Content-Type": "application/json"}
        })
    } catch (e) {
        console.error("Error:", e);
    }
}

export const DeleteUser = async (email: any, token: any) => {
    try {
        return await fetch(`http://localhost:8000/api/user/${email}`, {
            method: 'DELETE',
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
        })
    } catch (e) {
        console.log("error", e)
    }
}

export const AddUser = async (newUser: any) => {
    try {
        return await fetch("http://localhost:8000/api/user", {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {"Content-Type": "application/json"}
        })
    } catch (e) {
        console.log("error", e)
    }
}

export const ResetPassword = async (email: any) => {
    try {
        return await fetch(`http://localhost:8000/api/auth/password-recovery/${email}`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"}
        })
    } catch (e) {
        console.log("error", e)
    }
}

export const LoginUser = async (credentials: any) => {
    try {
        return await fetch("http://localhost:8000/api/auth/login", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {"Content-Type": "application/json"}
        })
    } catch (e) {
        console.log("error", e)
    }
}