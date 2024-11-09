/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function SearchPage() {
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSearchData({
        ...searchData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const getAuthor = async (userId) => {
      try {
        const response = await fetch(`/api/user/author/${userId}`);
        if (!response.ok) {
          console.log("Author not found");
        }
        return await response.json();
      } catch (error) {
        console.log(error.message);
        return null;
      }
    };

    const getPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      try {
        const response = await fetch(`/api/post/posts?${searchQuery}`);

        if (!response.ok) {
          setLoading(false);
          return;
        }

        if (response.ok) {
          const data = await response.json();
          const postsWithAuthors = await Promise.all(
            data.posts.map(async (post) => {
              const author = await getAuthor(post.userId);
              return { ...post, author };
            })
          );
          setPosts(postsWithAuthors);
          setLoading(false);
          if (data.posts.length > 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    getPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSearchData({ ...searchData, searchTerm: e.target.value });
    }

    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSearchData({ ...searchData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSearchData({ ...searchData, category: category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchData.searchTerm);
    urlParams.set("sort", searchData.sort);
    urlParams.set("category", searchData.category);
    window.location.href = `/search?${urlParams.toString()}`;
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    try {
      const response = await fetch(`/api/post/posts?${searchQuery}`);
      if (!response.ok) {
        return;
      }
      if (response.ok) {
        const data = await response.json();
        setPosts([...posts, ...data.posts]);
        if (data.posts.length > 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen container mx-auto sm:px-0 px-5 py-10 pb-20">
      <div className="flex flex-col sm:flex-row gap-5 justify-between">
        <h1 className="text-gray-400 sm:text-4xl text-3xl font-semibold">
          Results for{" "}
          <span className="text-primary-color dark:text-soft-white">
            {searchData.searchTerm || "..."}
          </span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <TextInput
            id="searchTerm"
            placeholder="Type to search"
            type="text"
            value={searchData.searchTerm}
            onChange={handleChange}
          />
          <div className="flex sm:gap-3 sm:justify-normal justify-between">
            <Select id="sort" value={searchData.sort} onChange={handleChange}>
              <option value="desc">Newest</option>
              <option value="asc">Oldest</option>
            </Select>
            <Select
              id="category"
              value={searchData.category}
              onChange={handleChange}
            >
              <option value="uncategorized">Select a Category</option>
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="travel">Travel</option>
              <option value="other">Other</option>
            </Select>

            <Button color="light" type="submit">
              Search
            </Button>
          </div>
        </form>
      </div>

      {/* search posts */}
      <div className="flex flex-wrap gap-2">
        {!loading && posts.length === 0 && (
          <p className="text-5xl mt-5 font-bold">No post found!</p>
        )}

        {!loading &&
          posts &&
          posts.map((post) => (
            <div className="sm:w-[32.8%] w-full">
              <PostCard key={post._id} post={post} />
            </div>
          ))}
      </div>
      {showMore && (
        <button
          className="block mx-auto mt-10 hover:underline text-teal-400"
          onClick={handleShowMore}
        >
          Show More
        </button>
      )}
    </div>
  );
}
