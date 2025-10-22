import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../../app/firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signInSuccess } from "../../auth/store/userSlice";

export function useGoogleAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(app);

    const signIn = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });

        try {
            const result = await signInWithPopup(auth, provider);
            const response = await fetch("/api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: result.user.displayName,
                    email: result.user.email,
                    googlePhotoUrl: result.user.photoURL,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                dispatch(signInSuccess(data));
                navigate("/home");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return { signIn };
}
