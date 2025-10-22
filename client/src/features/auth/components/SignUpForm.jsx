import { useSignUp } from "../hooks/useSignUp";
import { useSelector } from "react-redux";
import { Alert, Button, Spinner } from "flowbite-react";
import OAuth from "../../auth/components/OAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../components/InputField";

const SignUpForm = () => {
  const { formData, handleChange, handleSubmit, error, loading } = useSignUp();
  const { theme } = useSelector((state) => state.theme);
  return (
    <>
      <form
        className="flex-1 flex flex-col gap-y-5 p-7"
        onSubmit={handleSubmit}
      >
        <InputField
          id="username"
          label="Username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
        />

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

        <InputField
          id="password_again"
          label="Password"
          type="password"
          placeholder="********"
          value={formData.password_again}
          onChange={handleChange}
        />

        <div className="mt-7">
          <Button
            type="submit"
            className="w-full"
            color="dark"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" /> <span className="pl-3">Loading</span>
              </>
            ) : (
              "Sign Up"
            )}
          </Button>

          <OAuth />
          <ToastContainer />

          <p className="text-gray-400 mt-2 text-sm">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className={`${
                theme === "light" ? "text-primary-color" : "text-soft-white"
              } ml-1 underline hover:no-underline`}
            >
              Sign In
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

export default SignUpForm;
