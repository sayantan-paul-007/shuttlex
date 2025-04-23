import React, { useEffect, useState } from "react";
import Grid from "../components/Grid";
import Card from "../components/Card";
const Ships = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const getShips = async () => {
      try {
        const res = await fetch("https://api.spacexdata.com/v4/ships/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: {},
            options: {
              page: currentPage, // change this dynamically
              limit: itemsPerPage, // number of items per page
            },
          }),
        });
        const data = await res.json();
        setPosts(data.docs);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    getShips();
  }, [currentPage]);
  if (posts.length === 0) return <p>Loading Ships...</p>;
  return (
    <>
      <Grid>
        {posts.map((post, index) => (
          <Card key={post.id} style={{ animationDelay: `${index * 0.2}s` }}>
            <img
              src={post.image ? post.image : "https://placehold.co/600x400.png"}
              alt={post.name}
              className="w-full h-48 object-fit"
            />
            <h2 className="text-xl font-bold mt-2">{post.name}</h2>
            <p className="text-sm text-blue-700">Type:{post.type}</p>
            <p className="text-sm text-blue-700">
              Roles:{post.roles.map((role) => role)}
            </p>
            <p className="text-sm text-blue-700">
              {post.active ? "✅ Active" : "❌ Inactive"}
            </p>
            <p className="text-sm text-blue-700">Home Port:{post.home_port}</p>
            <p className="text-sm text-blue-700">
              Year built: {post.year_built}
            </p>
          </Card>
        ))}
      </Grid>
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Ships;
