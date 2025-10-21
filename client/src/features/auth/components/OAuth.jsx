import { Button } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { app } from "../../app/firebase";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { signInSuccess } from "../../auth/store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL,
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

  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      className="w-full mt-2"
      onClick={handleGoogle}
    >
      <FcGoogle className="w-6 h-6 mr-2" />
      <span className="text-sm pt-0.5">Continue with Google</span>
    </Button>
  );
}
