import React, { useEffect, useState } from "react";
import Grid from "../components/Grid";
import Card from "../components/Card";

const Crew = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const getCrew = async () => {
      try {
        const res = await fetch("https://api.spacexdata.com/v4/crew/query", {
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
    getCrew();
  }, [currentPage]);
  if (posts.length === 0) return <p>Loading Crew...</p>;

  return (
    <>
      <Grid>
        {posts.map((post, index) => (
          <Card key={post.id} style={{ animationDelay: `${index * 0.2}s` }}>
            <img
              src={post.image}
              alt={post.name}
              className="w-full h-48 object-contain rounded-t-lg"
            />
            <h2 className="text-xl font-bold mt-2">{post.name}</h2>
            <p className="text-sm text-gray-400">{post.agency}</p>
            <p>{post.status === "active" ? "✅ Active" : "❌ Inactive"}</p>
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

export default Crew;
