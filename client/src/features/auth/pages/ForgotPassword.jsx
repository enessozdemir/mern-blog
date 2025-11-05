import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../app/firebase";
import { Button } from "flowbite-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ ok: null, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email)
      return setStatus({ ok: false, message: "Please enter your email." });
    try {
      await sendPasswordResetEmail(auth, email);
      setStatus({ ok: true, message: "Reset email sent. Check your inbox." });
    } catch (err) {
      setStatus({
        ok: false,
        message: err.message || "Could not send reset email.",
      });
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-black">Forgot Password</h2>
        <p className="text-sm text-gray-500 mb-4">
          Enter your account email and we will send a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="border p-2 rounded text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Send reset link</Button>
        </form>

        {status.ok === true && (
          <p className="mt-4 text-green-600">{status.message}</p>
        )}
        {status.ok === false && (
          <p className="mt-4 text-red-600">{status.message}</p>
        )}
      </div>
    </main>
  );
}
