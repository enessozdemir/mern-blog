import { useSelector } from "react-redux";
import { PiXThin, PiEqualsThin } from "react-icons/pi";
import { Button, TextInput } from "flowbite-react";
import { useState } from "react";
import DashSidebar from "./DashSidebar";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [dropdown, setDropdown] = useState(false);
  return (
    <div className="flex justify-between w-full max-w-5xl px-5 py-5 sm:px-16">
      <div className="font-normal flex-1">
        <h1 className="font-medium text-2xl">Profile Information</h1>
        {/* photo */}
        <div className="flex flex-col mt-8">
          <p className="text-light-gray">Photo</p>
          <div className="flex gap-x-6 mt-2">
            <img
              src={currentUser.profilePicture}
              alt="User"
              className="w-20 h-20 rounded-full"
            />
            <div className="flex flex-col justify-evenly">
              <div className="flex gap-x-5">
                <span className="text-green-500 text-sm">Update</span>
                <span className="text-red-500 text-sm">Remove</span>
              </div>
              <p className="text-light-gray text-sm">
                Recommended: Square JPG, PNG.
              </p>
            </div>
          </div>
        </div>

        {/* username */}
        <div className="flex flex-col mt-8 w-full sm:w-2/3 gap-y-1">
          <p className="text-light-gray">Username</p>
          <TextInput value={currentUser.username} readOnly />
        </div>
        {/* email */}
        <div className="flex flex-col mt-8 w-full sm:w-2/3 gap-y-1">
          <p className="text-light-gray">Email</p>
          <TextInput value={currentUser.email} readOnly />
        </div>
        {/* password */}
        <div className="flex flex-col mt-8 w-full sm:w-2/3 gap-y-1">
          <p className="text-light-gray">Password</p>
          <TextInput value={"********"} readOnly />
        </div>

        <div className="flex justify-end sm:justify-start gap-x-5 mt-10 w-full sm:w-2/3">
          <Button color="light" className="w-1/2">
            Update
          </Button>
          <Button color="failure" className="w-1/2">
            Delete Account
          </Button>
        </div>
      </div>

      <div className="block sm:hidden">
        {dropdown ? <PiXThin size={25} onClick={() => setDropdown(!dropdown)} /> : <PiEqualsThin size={25} onClick={() => setDropdown(!dropdown)} />}
        {dropdown && (
            <div className="absolute top-28 left-0 w-full h-full">
                <DashSidebar />
            </div>
        )}
      </div>
    </div>
  );
}
