import { Button, Label, TextInput } from "flowbite-react";

export default function SignIn() {
  return (
    <div className="bg-gray-100 rounded-lg mt-20 flex container mx-auto gap-x-16">
    {/* left side */}
    <div className="flex-1 flex flex-col gap-y-4 p-8">
        <div>
            <Label>Email</Label>
            <TextInput placeholder="Email" id="email" type="email" required />
        </div>

        <div>
            <Label>Password</Label>
            <TextInput placeholder="Password" id="password" type="password" required />
        </div>


        <div className="mt-4">
            <Button type="submit" className="w-full" gradientDuoTone="greenToBlue">
                Sign In
            </Button>
            <p className="text-gray-600 mt-2">New here? Create your account now! <a href="/sign-up" className="text-blue-500 ml-1 hover:underline">Sign Up</a></p>
        </div>
    </div>

    {/* right side */}
    <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-[6rem] font-airone font-light">Blog.</h1>
        <p className="text-gray-400">Join a journey of discovery and inspiration, where each post unravels new ideas and sparks meaningful conversations.</p>
    </div>
</div>
  )
}
