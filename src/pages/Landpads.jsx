import React, { useEffect, useState } from "react";
import Grid from "../components/Grid";
import Card from "../components/Card";

const Landpads = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/landpads")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);
  if (posts.length === 0) return <p>Loading Landpads...</p>;

  return (
    <>
      <Grid>
        {posts.map((post, index) => (
          <Card key={post.id} style={{ animationDelay: `${index * 0.2}s` }}>
            <img
              src={post.images.large[0]}
              alt="Image"
              className="w-full h-52 object-cover border-b border-white/10"
            />
            <h2 className="text-2xl font-bold  mb-1">
              {post.full_name}({post.name})
            </h2>
            <p className="text-sm text-gray-400 mb-5">{post.details}</p>
            <p>
              {post.status === "active"
                ? `✅${post.status}`
                : `❌${post.status}`}
            </p>
            <p>{post.index}</p>
          </Card>
        ))}
      </Grid>
    </>
  );
};

export default Landpads;
