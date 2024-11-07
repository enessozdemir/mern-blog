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
import { Link } from "react-router-dom";

export default function DashPosts() {
  const [posts, setPosts] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState("");

  const handlePosts = async () => {
    try {
      const response = await fetch(
        `/api/post/posts/?userId=${currentUser._id}`
      );
      const data = await response.json();
      if (response.ok) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const response = await fetch(
        `/api/post/delete/${postId}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
      } else {
        setPosts((prev) => prev.filter((post) => post._id !== postId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser.isAdmin) {
      handlePosts();
      console.log(posts);
    }
  }, [currentUser._id]);

  return (
    <div>
      <div className="w-full flex justify-between px-5 sm:px-16 py-5">
        <h1 className="text-2xl">Posts</h1>
        <div className="block sm:hidden">
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

      <div className="overflow-scroll w-full px-5 sm:px-16 mb-10">
        {currentUser.isAdmin && posts.length > 0 ? (
          <>
            {/* web table */}
            <Table hoverable className="shadow-sm">
              <TableHead>
                <TableHeadCell>Update Date</TableHeadCell>
                <TableHeadCell>Image</TableHeadCell>
                <TableHeadCell>Title</TableHeadCell>
                <TableHeadCell>Category</TableHeadCell>
                <TableHeadCell>
                  <span>Edit</span>
                </TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
              </TableHead>
              {posts.map((post) => (
                <TableBody key={post._id} className="divide-y">
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table className="mt-6 ml-6">
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table>
                    <TableCell>
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image ? post.image : ""}
                          alt={"No Image"}
                          className="w-20 h-10 object-cover bg-gray-500"
                        />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        className="font-medium text-gray-900 dark:text-white"
                        to={`/post/${post.slug}`}
                      >
                        {post.title}
                      </Link>
                    </TableCell>
                    <TableCell>{post.category}</TableCell>
                    <TableCell>
                      <Link
                        className="text-teal-500 hover:underline"
                        to={`/update-post/${post._id}`}
                      >
                        <span>Edit</span>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <span
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                        onClick={() => {
                          setPostId(post._id);
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
          </>
        ) : (
          <p>You have no posts yet!</p>
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
          <ModalHeader className="p-6">Delete Post</ModalHeader>
          <ModalBody>
            <p className="text-sm text-justify">
              Are you sure you want to delete this post?
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
                onClick={handleDeletePost}
                color="failure"
                className="font-extralight"
                size="sm"
                pill
              >
                Delete Post
              </Button>
            </div>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
}
