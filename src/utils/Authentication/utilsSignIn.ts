/* eslint-disable @typescript-eslint/no-explicit-any */
import apiAuth from "../../Api/apiAuth";

interface User {
    username: string;
    password: string;
}



export const signIn = async (user: User) => {
    try {
        const response = await apiAuth.login(user);
        return response
    } catch (error) {
        console.error("Error searching courses by query:", error);
        throw error;
    }
}