import { Button, Label, TextInput } from "flowbite-react";

export default function SignIn() {
  return (
    <div className="rounded-lg mt-10 sm:mt-20 flex flex-col sm:flex-row container mx-auto gap-x-16">
    {/* left side */}
    <div className="flex-1 flex flex-col gap-y-4 p-7">
        <div>
            <Label>Email</Label>
            <TextInput placeholder="Email" id="email" type="email" required />
        </div>

        <div>
            <Label>Password</Label>
            <TextInput placeholder="Password" id="password" type="password" required />
        </div>


        <div className="mt-7">
            <Button type="submit" className="w-full" gradientDuoTone="greenToBlue">
                Sign In
            </Button>
            <p className="text-gray-600 mt-2 text-sm">New here? Create your account now! <a href="/sign-up" className="text-blue-500 ml-1 hover:underline">Sign Up</a></p>
        </div>
    </div>

    {/* right side */}
    <div className="flex-1 flex flex-col justify-center px-7 sm:px-0">
        <h1 className="text-[4rem] sm:text-[6rem] font-airone font-light">Blog.</h1>
        <p className="text-gray-400 text-sm">Your journey continues! Dive back into the world of inspiration and thoughtful conversations.</p>
    </div>
</div>
  )
}
