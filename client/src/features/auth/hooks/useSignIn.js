import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    signInStart,
    signInSuccess,
    signInFailure,
} from "../store/userSlice";


// Custom hook for managing SignIn form state and submission
export function useSignIn() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading } = useSelector((state) => state.user);

    // Handle input change for controlled form fields
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple client-side validation
        if (!formData.email || !formData.password) {
            return dispatch(signInFailure("Please fill in all fields!"));
        }

        try {
            dispatch(signInStart());

            const response = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok || data.success === false) {
                return dispatch(signInFailure(data.message || "Login failed"));
            }

            // On success, update Redux and navigate
            dispatch(signInSuccess(data));
            navigate("/home");
        } catch (err) {
            dispatch(signInFailure(err.message));
        }
    };

    return { formData, handleChange, handleSubmit, error, loading };
}
