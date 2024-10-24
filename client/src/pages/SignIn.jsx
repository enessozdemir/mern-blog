/* eslint-disable no-unused-vars */
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [formdata, setFormdata] = useState({});
  const { loading, error } = useSelector((state) => state.user);
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
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="rounded-lg mt-10 sm:mt-20 flex flex-col sm:flex-row container mx-auto gap-x-16">
      {/* left side */}
      <form
        className="flex-1 flex flex-col gap-y-4 p-7"
        onSubmit={handleSubmit}
      >
        <div>
          <Label>Email</Label>
          <TextInput
            placeholder="Email"
            id="email"
            type="email"
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Password</Label>
          <TextInput
            placeholder="Password"
            id="password"
            type="password"
            onChange={handleChange}
          />
        </div>

        <div className="mt-7">
          <Button
            type="submit"
            className="w-full"
            gradientDuoTone="greenToBlue"
          >
            Sign In
          </Button>
          <p className="text-gray-600 mt-2 text-sm">
            New here? Create your account now!{" "}
            <a href="/sign-up" className="text-blue-500 ml-1 hover:underline">
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
        <h1 className="text-[4rem] sm:text-[6rem] font-airone font-light">
          Blog.
        </h1>
        <p className="text-gray-400 text-sm">
          Your journey continues! Dive back into the world of inspiration and
          thoughtful conversations.
        </p>
      </div>
    </div>
  );
}
