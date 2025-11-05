import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { signInFailure } from '../store/userSlice';
import { Link } from 'react-router-dom';
import InputField from "./InputField";
import { useSignIn } from "../hooks/useSignIn";
import { Alert, Button } from "flowbite-react";
import OAuth from "../components/OAuth";

const SignInForm = () => {
  const { formData, handleChange, handleSubmit, error, loading } = useSignIn();
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch(signInFailure(null));
    }
    return () => dispatch(signInFailure(null));
  }, []);
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

        {/* forgot password link - right aligned */}
        <div className="w-full flex justify-end">
          <Link
            to="/forgot-password"
            className={`text-sm underline ml-1 ${
              theme === 'light' ? 'text-primary-color' : 'text-soft-white'
            }`}
          >
            Forgot password?
          </Link>
        </div>

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
            New here? Create your account now!{' '}
            <Link
              to="/sign-up"
              className={`${
                theme === 'light' ? 'text-primary-color' : 'text-soft-white'
              } ml-1 underline hover:no-underline`}
            >
              Sign Up
            </Link>
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
