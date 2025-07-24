import { create } from "zustand"
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuth = create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth ", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Signup successful Please login to continue");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigninUp: false });
        }
    },

    login: async (data, navigate) => {
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Login successful");
            navigate("/");
            return { success: true };
        } catch (error) {
            toast.error(error.response?.data?.message || "Error in login");
            console.log("Login error:", error.message);
            return { success: false };
        } finally {
            set({ isLoggingIng: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logout successful");
        } catch (error) {
            toast.error("Error in logging out");
        }
    },

    updateProfile: async (data) => {
        try {
            set({ isUpdatingProfile: true });
            // console.log("Sending update data:", data);
            if (data instanceof FormData) {
                for (let [key, value] of data.entries()) {
                    console.log(`${key}:`, value);
                }
            }
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            const res = await axiosInstance.put("/auth/update-profile", data, config);           
            set({ authUser: res.data.user });
            toast.success(res.data.message);
            return res.data.user;
        } catch (error) {
            console.error("Update Profile Error:", error);
            console.error("Response data:", error.response?.data);
            toast.error(error.response?.data?.message || "Error updating profile");
            throw error;
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
}));