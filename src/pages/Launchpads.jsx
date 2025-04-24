import React, { useEffect, useState } from "react";
import Grid from "../components/Grid";
import Card from "../components/Card";
const Launchposts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
      const getLaunchpads = async () => {
        try{
          const res = await fetch("https://api.spacexdata.com/v4/launchpads")
          const data = await res.json();
          setPosts(data);
        } catch (err) {
          console.error("Error fetching posts:", err);
        }
      };
      getLaunchpads();
    }, []);
  if (posts.length === 0) return <p>Loading Launchpads...</p>;

  return (
    <>
      <Grid>
        {posts.map((post, index) => (
          <Card key={post.id} style={{ animationDelay: `${index * 0.2}s` }}>
            <img
              src={post.images.large[0]}
              alt={post.name}
              className="w-full h-48 object-cover"
            />
            <h2 className="text-xl font-bold">{post.name}</h2>
            <p className="text-sm text-gray-500">{post.region}</p>
            <p>
              Status: {post.status === "active" ? "🟢 Active" : "🔴 Retired"}
            </p>
            <p>
              Launches: {post.launch_successes}/{post.launch_attempts}
            </p>
          </Card>
        ))}
      </Grid>
    </>
  );
};

export default Launchposts;
