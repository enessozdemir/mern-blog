/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { PiEqualsThin, PiXThin } from "react-icons/pi";
import DashSidebar from "./DashSidebar";
import { useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { FiCheck, FiX } from "react-icons/fi";

export default function DashUsers() {
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");

  const handleUsers = async () => {
    try {
      const response = await fetch("/api/user/users/");
      const data = await response.json();
      if (response.ok) {
        setUsers(data.users);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowMore = async () => {
    try {
      const response = await fetch(
        `/api/user/users/?userId?startIndex=${users.length}`
      );
      const data = await response.json();
      if (response.ok) {
        setUsers([...users, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/user/delete/${userId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
      } else {
        setUsers((prev) => prev.filter((user) => user._id !== userId));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (currentUser.isAdmin) {
      handleUsers();
    }
  }, [currentUser._id]);

  return (
    <div>
      <div className="w-full flex justify-between px-5 sm:px-16 py-5">
        <h1 className="text-2xl">Users</h1>
        <div
          className={`block sm:hidden transition-all duration-300 ease-in-out ${
            dropdown ? "max-h-screen opacity-100" : "max-h-0 opacity-100"
          }`}
        >
          {dropdown ? (
            <PiXThin
              className="cursor-pointer"
              size={25}
              onClick={() => setDropdown(!dropdown)}
            />
          ) : (
            <PiEqualsThin
              className="cursor-pointer"
              size={25}
              onClick={() => setDropdown(!dropdown)}
            />
          )}
          {dropdown && (
            <div className="absolute top-28 left-0 w-full h-full z-10">
              <DashSidebar />
            </div>
          )}
        </div>
      </div>

      <div className="overflow-scroll px-5 sm:px-16 mb-10">
        {currentUser.isAdmin && users.length > 0 ? (
          <>
            {/* web table */}
            <Table hoverable className="shadow-sm">
              <TableHead>
                <TableHeadCell>Create Date</TableHeadCell>
                <TableHeadCell>Image</TableHeadCell>
                <TableHeadCell>Username</TableHeadCell>
                <TableHeadCell>Email</TableHeadCell>
                <TableHeadCell>Admin</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
              </TableHead>
              {users.map((user) => (
                <TableBody key={user._id} className="divide-y">
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table className="mt-6 ml-6">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Table>
                    <TableCell>
                      <img
                        src={user.profilePicture ? user.profilePicture : ""}
                        alt={"No Image"}
                        className="w-10 h-10 rounded-full object-cover bg-gray-500"
                      />
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.isAdmin ? (
                        <FiCheck className="text-green-500 ml-3" />
                      ) : (
                        <FiX className="text-red-500 ml-3" />
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                        onClick={() => {
                          setUserId(user._id);
                          setShowModal(true);
                        }}
                      >
                        Delete
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>

            {showMore && (
              <button
                className="block mx-auto my-5 text-teal-400"
                onClick={handleShowMore}
              >
                Show More
              </button>
            )}
          </>
        ) : (
          <p>You have no users yet!</p>
        )}
      </div>

      {showModal && (
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
          className="text-gray-500"
        >
          <ModalHeader className="p-6">Delete User</ModalHeader>
          <ModalBody>
            <p className="text-sm text-justify">
              Are you sure you want to delete this user?
            </p>

            <div className="flex justify-end gap-x-2 mt-5">
              <Button
                color="light"
                className="font-extralight text-red-600 border border-red-600"
                onClick={() => setShowModal(false)}
                size="sm"
                pill
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteUser}
                color="failure"
                className="font-extralight"
                size="sm"
                pill
              >
                Delete User
              </Button>
            </div>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
}
