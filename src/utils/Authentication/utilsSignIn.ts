/* eslint-disable @typescript-eslint/no-explicit-any */
import apiAuth from "../../Api/apiAuth";

interface User {
    username: string;
    password: string;
}

interface ApiResponse {
    status: number;
    data: any;
    token: string;
    user: {
        id: string;
        name: string;
    };
}

export const signIn = async (user: User): Promise<ApiResponse> => {
    const response = await apiAuth.login(user) as ApiResponse;
    return response;
}