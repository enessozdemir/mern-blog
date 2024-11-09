import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiArrowUp, FiFile, FiMessageSquare, FiUser } from "react-icons/fi";
import { PiEqualsThin, PiXThin } from "react-icons/pi";
import DashSidebar from "./DashSidebar";

export default function DashComponent() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [dropdown, setDropdown] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("/api/user/users?limit=5");
        const data = await response.json();
        if (response.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const getPosts = async () => {
      try {
        const response = await fetch("/api/post/posts?limit=5");
        const data = await response.json();
        if (response.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const getComments = async () => {
      try {
        const response = await fetch("/api/comment/getCommentsByUser?sort=desc&limit=6");
        const data = await response.json();
        if (response.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      getUsers();
      getPosts();
      getComments();
    }
  }, [currentUser]);
  return (
    <div className="mb-20">
      <div className="w-full flex justify-between px-5 sm:px-16 py-5">
        <h1 className="text-2xl">Dashboard</h1>
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

      <div className="flex-wrap flex gap-4 px-5 sm:px-16">
        <div className="flex flex-col p-3 gap-4 md:w-[32.2%] w-full rounded-md shadow-md border dark:border-gray-600">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <FiUser className="bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              {lastMonthUsers > 0 ? <FiArrowUp /> : null}
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 gap-4 md:w-[32.2%] w-full rounded-md shadow-md border dark:border-gray-600">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">
                Total Comments
              </h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <FiMessageSquare className="bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              {lastMonthComments > 0 ? <FiArrowUp /> : null}
              {lastMonthComments}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 gap-4 md:w-[32.2%] w-full rounded-md shadow-md border dark:border-gray-600">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <FiFile className="bg-pink-500  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              {lastMonthPosts > 0 ? <FiArrowUp /> : null}
              {lastMonthPosts}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 py-3 px-5 sm:px-16">
        <div className="flex flex-col w-full md:w-[66%] shadow-md p-2 rounded-md dark:bg-gray-800 border dark:border-gray-600">
          <div className="flex justify-between  p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent comments</h1>
            <Button color="light">
              <Link to={"/dashboard?tab=comments"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>Comment content</TableHeadCell>
              <TableHeadCell>Likes</TableHeadCell>
            </TableHead>
            {comments &&
              comments.map((comment) => (
                <TableBody key={comment._id} className="divide-y">
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>
                      <p className="line-clamp-2">{comment.content}</p>
                    </TableCell>
                    <TableCell>{comment.numberOfLikes}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </div>

        <div className="flex flex-col w-full md:w-[32%] shadow-md p-2 rounded-md dark:bg-gray-800 border dark:border-gray-600">
          <div className="flex justify-between  p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent users</h1>
            <Button color="light">
              <Link to={"/dashboard?tab=users"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>User image</TableHeadCell>
              <TableHeadCell>Username</TableHeadCell>
            </TableHead>
            {users &&
              users.map((user) => (
                <TableBody key={user._id} className="divide-y">
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>
                      <img
                        src={user.profilePicture}
                        alt="user"
                        className="w-10 h-10 rounded-full bg-gray-500"
                      />
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </div>

        <div className="flex flex-col w-full shadow-md border dark:border-gray-600 p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center">Recent posts</h1>
            <Button color="light">
              <Link to={"/dashboard?tab=posts"}>See all</Link>
            </Button>
          </div>
          <Table className="hidden sm:block" hoverable>
            <TableHead>
              <TableHeadCell>Update Date</TableHeadCell>
              <TableHeadCell>Post image</TableHeadCell>
              <TableHeadCell>Post Title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
            </TableHead>
            {posts &&
              posts.map((post) => (
                <TableBody key={post._id} className="divide-y">
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table className="mt-6 ml-6">
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table>
                    <TableCell>
                      <img
                        src={post.image}
                        alt="user"
                        className="w-14 h-10 rounded-md bg-gray-500"
                      />
                    </TableCell>
                    <TableCell>{post.title}</TableCell>
                    <TableCell>{post.category}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>

          <Table className="block sm:hidden w-full" hoverable>
            <TableHead>
              <TableHeadCell>Post image</TableHeadCell>
              <TableHeadCell>Post Title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
            </TableHead>
            {posts &&
              posts.map((post) => (
                <TableBody key={post._id} className="divide-y">
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>
                      <img
                        src={post.image}
                        alt="user"
                        className="w-14 h-10 rounded-md bg-gray-500"
                      />
                    </TableCell>
                    <TableCell className="w-96">{post.title}</TableCell>
                    <TableCell className="w-5">{post.category}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
