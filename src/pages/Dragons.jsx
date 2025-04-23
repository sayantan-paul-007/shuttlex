import React, { useEffect, useState } from "react";
import Grid from "../components/Grid";
import Card from "../components/Card";
const Dragons = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/dragons")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);
  if (posts.length === 0) return <p>Loading Dragons...</p>;

  return (
    <>
      <Grid>
        {posts.map((post, index) => (
          <Card key={post.id} style={{ animationDelay: `${index * 0.2}s` }}>
            <img
              src={post.flickr_images[0]}
              alt={post.name}
              className="w-full h-48 object-fit"
            />
            <h2 className="text-xl font-bold mt-2">{post.name}</h2>
            <p className="text-sm text-gray-400">{post.type}</p>
            <p>{post.active ? "✅ Active" : "❌ Inactive"}</p>
            <p>👩‍🚀 Crew: {post.crew_capacity}</p>
          </Card>
        ))}
      </Grid>
    </>
  );
};

export default Dragons;
