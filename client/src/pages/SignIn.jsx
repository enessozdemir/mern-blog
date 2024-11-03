/* eslint-disable no-unused-vars */
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import LoginHeader from "../components/LoginHeader";

export default function SignIn() {
  const [formdata, setFormdata] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formdata.email || !formdata.password) {
      return dispatch(signInFailure("Please fill in all fields!"));
    }

    try {
      dispatch(signInStart());
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await response.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (response.ok) {
        dispatch(signInSuccess(data));
        navigate("/home");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  useEffect(() => {
    signInStart();
  }, [error]);

  return (
    <div>
      <LoginHeader />
      <div className="flex flex-col sm:flex-row container mx-auto gap-x-16 gap-y-7 pt-10 sm:pt-32">
        {/* left side */}
        <form
          className="flex-1 flex flex-col gap-y-4 p-7"
          onSubmit={handleSubmit}
        >
          <div>
            <Label>Email</Label>
            <TextInput
              placeholder="xyz@example.com"
              id="email"
              type="email"
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Password</Label>
            <TextInput
              placeholder="********"
              id="password"
              type="password"
              onChange={handleChange}
            />
          </div>

          <div className="mt-7">
            <Button type="submit" className="w-full" color="dark">
              Sign In
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

        {/* right side */}
        <div className="flex-1 flex flex-col justify-center px-7 sm:px-0">
          <h1
            className={`${
              theme === "light" ? "text-primary-color" : "text-soft-white"
            } text-[4rem] sm:text-[6rem] font-airone font-light`}
          >
            Blog.
          </h1>
          <p className="text-gray-400 text-sm">
            Your journey continues! Dive back into the world of inspiration and
            thoughtful conversations.
          </p>
        </div>
      </div>
    </div>
  );
}
