import apiUser from "../Api/apiUser";
import { UserCreate, UserData } from "../utils/interface";

export const fetchAllUsers = async () => {
    try {
        const users = await apiUser.getAllUser();
        return users;
    } catch (error) {
        console.error("Error fetching all users:", error);
        throw error;
    }
}

export const fetchUserByID = async (idUser: string) => {
    try {
        const user = await apiUser.getByID(idUser);
        return user;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};
export const changePassword = async (idUser: string, data: { old_password: string, new_password: string }) => {
    try {
        const updatedUser = await apiUser.changePassword(idUser, data);
        return updatedUser;
    } catch (error) {
        console.error("Error changing password:", error);
        throw error;
    }
}

export const updateUserByID = async (idUser: string, data: UserData) => {
    try {
        const updatedUser = await apiUser.putByID(idUser, data);
        return updatedUser;
    } catch (error) {
        console.error("Error updating user by ID:", error);
        throw error;
    }
};

export const createUser = async (data: UserCreate) => {
    try {
        const newUser = await apiUser.postNewUser(data);
        return newUser;
    } catch (error) {
        console.error("Error creating new user:", error);
        throw error;
    }
};

export const deleteUserByID = async (idUser: string) => {
    try {
        const deletedUser = await apiUser.deleteUser(idUser);
        return deletedUser;
    } catch (error) {
        console.error("Error deleting user by ID:", error);
        throw error;
    }
};
