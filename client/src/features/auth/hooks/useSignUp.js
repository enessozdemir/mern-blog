import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Hook for SignUp form state and submission
export function useSignUp() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password_again: "",
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const notifySuccess = () =>
        toast.success("User successfully created!", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            pauseOnFocusLoss: false,
            draggable: false,
            theme: "dark",
            onClose: () => navigate("/sign-in"),
        });

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (!formData.username || !formData.email || !formData.password || !formData.password_again) {
            return setError("Please fill in all fields!");
        } else if (formData.password !== formData.password_again) {
            return setError("Passwords do not match!");
        } else if (formData.password.length < 6) {
            return setError("Password must be at least 6 characters!");
        }

        try {
            setLoading(true);
            setError(null);

            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok || data.success === false) {
                setError(data.message || "Signup failed");
            } else {
                setLoading(false);
                setFormData({ username: "", email: "", password: "", password_again: "" });
                notifySuccess();
            }
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return { formData, handleChange, handleSubmit, error, loading };
}
