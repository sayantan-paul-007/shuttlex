import React, { useEffect, useState } from "react";
import Grid from "../components/Grid";
import Card from "../components/Card";
const Rockets = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/rockets")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);
  if (posts.length === 0) return <p className="bg-black">Loading Rockets...</p>;

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
            <p className="text-sm text-gray-600">
              First Flight:{post.first_flight}
            </p>
            <p className="text-sm text-gray-600">Stages:{post.stages}</p>
            <p className="text-sm text-gray-600">
              {post.active ? "✅ Active" : "❌ Inactive"}
            </p>
            <p className="text-sm text-gray-600">
              Cost per launch: ${post.cost_per_launch}
            </p>
            <p className="text-sm text-gray-600">
              Success Percentage: {post.success_rate_pct}%
            </p>
            <p className="text-sm text-gray-600">Company: {post.company}</p>
            <p className="text-sm text-gray-600">Country: {post.country}</p>
          </Card>
        ))}
      </Grid>
    </>
  );
};

export default Rockets;
