import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useSearch = () => {
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
            setSearchData(prev => ({
                ...prev,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl,
            }));
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

    return { searchData, posts, loading, showMore, handleChange, handleShowMore, handleSubmit }
}