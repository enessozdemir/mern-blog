import { useSelector } from "react-redux";
import InputField from "./InputField";
import { useSignIn } from "../hooks/useSignIn";
import { Alert, Button } from "flowbite-react";
import OAuth from "../components/OAuth";

const SignInForm = () => {
  const { formData, handleChange, handleSubmit, error, loading } = useSignIn();
  const { theme } = useSelector((state) => state.theme);
  return (
    <>
      <form
        className="flex-1 flex flex-col gap-y-4 p-7"
        onSubmit={handleSubmit}
      >
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="xyz@example.com"
          value={formData.email}
          onChange={handleChange}
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="********"
          value={formData.password}
          onChange={handleChange}
        />

        <div className="mt-7">
          <Button
            type="submit"
            className="w-full"
            color="dark"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <OAuth />

          <p className="text-gray-400 mt-2 text-sm">
            New here? Create your account now!{" "}
            <a
              href="/sign-up"
              className={`${
                theme === "light" ? "text-primary-color" : "text-soft-white"
              } ml-1 underline hover:no-underline`}
            >
              Sign Up
            </a>
          </p>
        </div>

        {error && (
          <Alert className="mt-5" color="failure">
            {error}
          </Alert>
        )}
      </form>
    </>
  );
};

export default SignInForm;
