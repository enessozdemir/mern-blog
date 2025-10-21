import {
  Modal,
  Table,
  Button,
  ModalHeader,
  ModalBody,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { PiEqualsThin, PiXThin } from "react-icons/pi";
import { useSelector } from "react-redux";
import DashSidebar from "./DashSidebar";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function DashMyComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");
  const location = useLocation();

  useEffect(() => {
    setComments([]);
    const getUserComments = async () => {
      try {
        const response = await fetch(
          `/api/comment/getCommentsByUser/${currentUser._id}?sort=desc`
        );
        if (response.ok) {
          const commentData = await response.json();
          const commentsWithPosts = await Promise.all(
            commentData.comments.map(async (comment) => {
              const postResponse = await fetch(
                `/api/post/posts/?postId=${comment.postId}`
              );
              const postData = await postResponse.json();
              return {
                ...comment,
                post: postResponse.ok ? postData : null,
              };
            })
          );
          setComments((prev) => [...prev, ...commentsWithPosts]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserComments();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(`/api/comment/comments?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/delete-comment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="w-full flex justify-between px-5 sm:px-16 py-5">
        <h1 className="text-2xl">Comments</h1>
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

      <div className="overflow-scroll px-5 sm:px-16 mb-10">
        <div className="flex gap-3 pb-5">
          <Link to="/dashboard?tab=comments">
            <Button
              className={`focus:ring-0 border text-primary-color dark:text-soft-white ${
                location.search === "?tab=comments"
                  ? "border-red-600"
                  : "border-gray-600 hover:opacity-80"
              }`}
            >
              My Posts Comments
            </Button>
          </Link>
          <Link to="/dashboard?tab=my-comments">
            <Button
              className={`focus:ring-0 border text-primary-color dark:text-soft-white ${
                location.search === "?tab=my-comments"
                  ? "border-red-600"
                  : "border-gray-600 hover:opacity-80"
              }`}
            >
              My Comments
            </Button>
          </Link>
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=all-comments">
              <Button
                className={`focus:ring-0 border text-primary-color dark:text-soft-white ${
                  location.search === "?tab=all-comments"
                    ? "border-red-600"
                    : "border-gray-600 hover:opacity-80"
                }`}
              >
                All Comments
              </Button>
            </Link>
          )}
        </div>
        {comments.length > 0 ? (
          <>
            <Table hoverable className="shadow-sm">
              <TableHead>
                <TableHeadCell>Date Updated</TableHeadCell>
                <TableHeadCell>Comment Content</TableHeadCell>
                <TableHeadCell>Number of likes</TableHeadCell>
                <TableHeadCell>Post</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
              </TableHead>
              {comments.map((comment) => (
                <TableBody className="divide-y" key={comment._id}>
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>
                      {new Date(comment.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{comment.content}</TableCell>
                    <TableCell className="text-center">
                      {comment.numberOfLikes}
                    </TableCell>
                    <TableCell>
                      <Link to={`/post/${comment.post.posts[0]?.slug}`}>
                        <div className="flex gap-2 items-center">
                          <img
                            className="hidden sm:block w-16 h-12"
                            src={comment.post.posts[0]?.image}
                            alt=""
                          />
                          <p className="text-sm">
                            {comment.post.posts[0]?.title}
                          </p>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setCommentIdToDelete(comment._id);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
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
                onClick={handleShowMore}
                className="w-full text-teal-500 self-center text-sm py-7"
              >
                Show more
              </button>
            )}
          </>
        ) : (
          <p>You have no comments yet!</p>
        )}
        {showModal && (
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            popup
            size="md"
            className="text-gray-500"
          >
            <ModalHeader className="p-6">Delete Comment</ModalHeader>
            <ModalBody>
              <p className="text-sm text-justify">
                Are you sure you want to delete this comment?
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
                  onClick={handleDeleteComment}
                  color="failure"
                  className="font-extralight"
                  size="sm"
                  pill
                >
                  Delete Comment
                </Button>
              </div>
            </ModalBody>
          </Modal>
        )}
      </div>
    </div>
  );
}
