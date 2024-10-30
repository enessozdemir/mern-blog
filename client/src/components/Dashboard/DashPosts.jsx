import { useState } from "react";
import { PiEqualsThin, PiXThin } from "react-icons/pi";
import DashSidebar from "./DashSidebar";

export default function DashPosts() {
  const [dropdown, setDropdown] = useState(false);
  return (
    <div className="flex flex-col sm:flex-row w-full">
      <div className="flex justify-between w-full max-w-5xl px-5 py-5 sm:px-16">
        <div className="font-normal flex-1">
          <h1 className="font-medium text-2xl">Posts</h1>

          














        </div>
        <div className="block sm:hidden">
          {dropdown ? (
            <PiXThin size={25} onClick={() => setDropdown(!dropdown)} />
          ) : (
            <PiEqualsThin size={25} onClick={() => setDropdown(!dropdown)} />
          )}
          {dropdown && (
            <div className="absolute top-28 left-0 w-full h-full">
              <DashSidebar />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
