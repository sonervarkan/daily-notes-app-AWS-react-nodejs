// frontend/src/api/authApi.js

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; 

const authApi = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const registerUser=async(userData)=>{
    const response=await authApi.post("/auth/register", userData); 
                                    // server.js=> app.use("/auth",authRoutes);
    return response.data;
}

export const loginUser=async(userData)=>{
    const response=await authApi.post("/auth/login", userData); 
    return response.data;
}

export const logoutUser=async()=>{
    const response=await authApi.post("/auth/logout"); 
    return response.data;
}

export default authApi;