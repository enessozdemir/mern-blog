import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [formdata, setFormdata] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const notify = () =>
    toast.success("User successfully created!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "dark",
      progress: undefined,
      onClose: () => navigate("/sign-in"),
    });

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value.trim() });
  };

  const handeSubmit = async (e) => {
    e.preventDefault();

    if (
      !formdata.username ||
      !formdata.email ||
      !formdata.password ||
      !formdata.password_again
    ) {
      return setError("Please fill in all fields!");
    } else if (formdata.password !== formdata.password_again) {
      return setError("Passwords do not match!");
    } else if (formdata.password.length < 6) {
      return setError("Password must be at least 6 characters!");
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();
      if (data.success === false) {
        return setError(data.message);
      }

      setLoading(false);
      setFormdata({
        username: "",
        email: "",
        password: "",
        password_again: "",
      });
      notify();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 sm:mt-16 flex flex-col sm:flex-row container mx-auto gap-x-16">
      {/* left side */}
      <form className="flex-1 flex flex-col gap-y-5 p-7" onSubmit={handeSubmit}>
        <div>
          <Label>Username</Label>
          <TextInput
            placeholder="Username"
            id="username"
            type="text"
            onChange={handleChange}
            value={formdata.username}
          />
        </div>

        <div>
          <Label>Email</Label>
          <TextInput
            placeholder="Email"
            id="email"
            type="email"
            onChange={handleChange}
            value={formdata.email}
          />
        </div>

        <div>
          <Label>Password</Label>
          <TextInput
            placeholder="Password"
            id="password"
            type="password"
            onChange={handleChange}
            value={formdata.password}
          />
        </div>

        <div>
          <Label>Password Again</Label>
          <TextInput
            placeholder="Password Again"
            id="password_again"
            type="password"
            onChange={handleChange}
            value={formdata.password_again}
          />
        </div>

        <div className="mt-7">
          <Button
            type="submit"
            className="w-full"
            gradientDuoTone="greenToBlue"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading</span>
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
          <ToastContainer />
          <p className="text-gray-600 mt-2 text-sm">
            Already have an account?{" "}
            <a href="/sign-in" className="text-blue-500 ml-1 hover:underline">
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

      {/* right side */}
      <div className="flex-1 flex flex-col justify-center px-7 sm:px-0">
        <h1 className="text-[4rem] sm:text-[6rem] font-airone font-light">
          Blog.
        </h1>
        <p className="text-gray-400 text-sm">
          Join a journey of discovery and inspiration, where each post unravels
          new ideas and sparks meaningful conversations.
        </p>
      </div>
    </div>
  );
}
