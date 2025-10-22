import { Button } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

export default function OAuth() {
  const { signIn } = useGoogleAuth();

  return (
    <Button
      onClick={signIn}
      gradientDuoTone="pinkToOrange"
      outline
      className="w-full mt-2"
    >
      <FcGoogle className="w-6 h-6 mr-2" />
      <span className="text-sm pt-0.5">Continue with Google</span>
    </Button>
  );
}
