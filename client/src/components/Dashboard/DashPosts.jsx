/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { PiEqualsThin, PiXThin } from "react-icons/pi";
import DashSidebar from "./DashSidebar";
import { useSelector } from "react-redux";
import { Table, TableBody, TableRow } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DashPosts() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
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
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUser.isAdmin) {
      handlePosts();
    }
  }, [currentUser._id]);

  const [dropdown, setDropdown] = useState(false);
  return (
    <div className="flex justify-between w-full max-w-5xl px-5 py-5 sm:px-16">
      <div className="">
        <h1 className="font-medium text-2xl">Posts</h1>
        <div className="table-auto overflow-x-scroll mt-5 md:mx-auto">
          {currentUser.isAdmin && posts.length > 0 ? (
            <>
              {/* web table */}
              <Table hoverable className="shadow-md hidden sm:block">
                <Table.Head>
                  <Table.HeadCell>Update Date</Table.HeadCell>
                  <Table.HeadCell>Image</Table.HeadCell>
                  <Table.HeadCell>Title</Table.HeadCell>
                  <Table.HeadCell>Category</Table.HeadCell>
                  <Table.HeadCell>
                    <span>Edit</span>
                  </Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                {posts.map((post) => (
                  <TableBody key={posts._id} className="divide-y">
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table className="mt-6 ml-6">
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </Table>
                      <Table.Cell>
                        <Link to={`/post/${post.slug}`}>
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-20 h-10 object-cover bg-gray-500"
                          />
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          className="font-medium text-gray-900 dark:text-white"
                          to={`/post/${post.slug}`}
                        >
                          {post.title}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{post.category}</Table.Cell>
                      <Table.Cell>
                        <Link
                          className="text-teal-500 hover:underline"
                          to={`/update-post/${post._id}`}
                        >
                          <span>Edit</span>
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="font-medium text-red-500 hover:underline cursor-pointer">
                          Delete
                        </span>
                      </Table.Cell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>

              {/* mobile table */}
              <Table hoverable className="shadow-md block sm:hidden">
                <Table.Head>
                  <Table.HeadCell>Image</Table.HeadCell>
                  <Table.HeadCell>Title</Table.HeadCell>
                  <Table.HeadCell>Category</Table.HeadCell>
                </Table.Head>
                {posts.map((post) => (
                  <TableBody key={posts._id} className="divide-y">
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>
                        <Link to={`/post/${post.slug}`}>
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-20 h-10 object-cover bg-gray-500"
                          />
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          className="font-medium text-gray-900 dark:text-white"
                          to={`/post/${post.slug}`}
                        >
                          {post.title}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{post.category}</Table.Cell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </>
          ) : (
            <p>You have no posts yet!</p>
          )}
        </div>
      </div>
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
          <div className="absolute top-28 left-0 w-full h-full">
            <DashSidebar />
          </div>
        )}
      </div>
    </div>
  );
}
