import { Button, Label, TextInput } from "flowbite-react";

export default function SignUp() {
  return (
    <div className=" rounded-lg mt-5 sm:mt-20 flex flex-col sm:flex-row container mx-auto gap-x-16">
        {/* left side */}
        <div className="flex-1 flex flex-col gap-y-5 p-7">
            <div>
                <Label>Username</Label>
                <TextInput placeholder="Username" id="username" type="text" required />
            </div>

            <div>
                <Label>Email</Label>
                <TextInput placeholder="Email" id="email" type="email" required />
            </div>

            <div>
                <Label>Password</Label>
                <TextInput placeholder="Password" id="password" type="password" required />
            </div>

            <div>
                <Label>Password Again</Label>
                <TextInput placeholder="Password Again" id="password_again" type="password" required />
            </div>


            <div className="mt-7">
                <Button type="submit" className="w-full" gradientDuoTone="greenToBlue">
                    Sign Up
                </Button>
                <p className="text-gray-600 mt-2 text-sm">Already have an account? <a href="/sign-in" className="text-blue-500 ml-1 hover:underline">Sign In</a></p>
            </div>
        </div>

        {/* right side */}
        <div className="flex-1 flex flex-col justify-center px-7 sm:px-0">
            <h1 className="text-[4rem] sm:text-[6rem] font-airone font-light">Blog.</h1>
        <p className="text-gray-400 text-sm">Join a journey of discovery and inspiration, where each post unravels new ideas and sparks meaningful conversations.</p>
    </div>
    </div>
  )
}
