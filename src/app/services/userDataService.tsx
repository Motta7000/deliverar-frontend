"use client"
export const UpdateUser = async (newUser: { email: string; name: string; password: string; }, token) => {
    try {
        return await fetch(`http://localhost:8000/api/user/`, {
            method: 'PUT',
            body: JSON.stringify(newUser),
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
        })
    } catch (e) {
        console.log("error", e)
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

/*export const ChangeProfileImage = async (email: any, token: any, profilePicture: any) => {
    try {
        return await fetch(`http://localhost:8000/api/user/profile-picture/${email}`, {
            method: 'PUT',
            body: JSON.stringify(profilePicture),
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
        })
    } catch (e) {
        console.log("error", e)
    }
}*/

export const ChangeProfileImage = async (email: any, token: any, profilePicture: any) => {
    console.log("profilePicture", profilePicture);
    try {
        const formData = new FormData();
        formData.append('profilePicture', profilePicture);

        return await fetch(`http://localhost:8000/api/user/profile-picture/${email}`, {
            method: 'PUT',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`,
            },
        });
    } catch (e) {
        console.log("error", e);
    }
};

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