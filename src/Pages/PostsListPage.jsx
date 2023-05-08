import { useState, useEffect } from "react";
import PostCard from "../components/PostCard/PostCard";
import Header from "../components/Header/Header";

const PostListPage = () => {
  const [posts, setPosts] = useState([]); //api response
  const [searchQuery, setSearchQuery] = useState(""); //state to store search query
  const [filteredPosts, setFilteredPosts] = useState([]); //filtered posts based on search and sort
  const [paginatedPosts, setPaginatedPosts] = useState([]); //for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setFilteredPosts(() =>
      posts?.filter((item) =>
        searchQuery === ""
          ? item
          : item.body
              .toLocaleLowerCase()
              .includes(searchQuery.toLocaleLowerCase()) ||
            item.title
              .toLocaleLowerCase()
              .includes(searchQuery.toLocaleLowerCase())
      )
    );
  }, [searchQuery]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response?.json())
      .then((json) => {
        // console.log(json);
        setPosts(json);
        setFilteredPosts(json);
      })
      .catch((e) => {
        setErrorMessage(e.message);
      });
  }, []);

  //pagination logic

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  useEffect(() => {
    setPaginatedPosts(filteredPosts?.slice(indexOfFirstPost, indexOfLastPost));
  }, [filteredPosts, indexOfFirstPost, indexOfLastPost]);

  if (errorMessage === "")
    return (
      <>
        <Header
          setSearchQuery={setSearchQuery}
          setFilteredPosts={setFilteredPosts}
          filteredPosts={filteredPosts}
        />
        {paginatedPosts?.length ? (
          <>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {paginatedPosts &&
                paginatedPosts?.map((item, index) => {
                  return <PostCard key={index} post={item} />;
                })}
            </div>
            <div style={{ margin: "12px" }}>
              <span style={{ margin: "8px" }}>Select rows per page</span>
              <input
                type="number"
                onChange={(e) =>
                  e.target.value
                    ? setPostsPerPage(e.target.value)
                    : setPostsPerPage(5)
                }
              ></input>
              {/* <button
                style={{ margin: "10px" }}
                onClick={() => setPostsPerPage(5)}
              >
                5 posts per page
              </button>
              <button onClick={() => setPostsPerPage(10)}>
                10 posts per page
              </button> */}
            </div>
            <div>
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  style={{ margin: "5px", marginBottom: "20px" }}
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div style={{ margin: "10%" }}>No records found</div>
        )}
      </>
    );
  else
    return (
      <>
        <p>{errorMessage}</p>
      </>
    );
};

export default PostListPage;
