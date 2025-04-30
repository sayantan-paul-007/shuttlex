import React, { useEffect, useState } from "react";
import Grid from "../components/Grid";
import Card from "../components/Card";
import ImageCarousel from "../components/ImageCarousel";
const Rockets = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/rockets")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);
  if (posts.length === 0) return <p className="bg-black text-white">Loading Rockets...</p>;

  return (
    <>
      <Grid>
        {posts.map((post, index) => (
          <Card key={post.id} style={{ animationDelay: `${index * 0.2}s` }}>
           <ImageCarousel images={post.flickr_images} />
            <div className=" bg-gradient-to-r from-gray-800/40 to-gray-700/40 p-4 border-b border-gray-600">
                              <div className="flex items-center">
                                <div>
                                  <h2 className="text-2xl font-bold text-white tracking-wider">
                                    {post.name} 
                                  </h2>
                                  <div className="flex items-center text-md mt-2 font-semibold text-gray-400">
                                  
                                 {post.company}, {post.country}
                                 
                                  </div>
                                </div>
                              </div>
                            </div>

             <div className="p-5 relative z-10">
                                          <div className="flex items-center mb-4">
                                            <div
                                              className={` px-3 py-2 rounded-full flex items-center  ${
                                                post.active === true
                                                  ? "text-green-400 bg-green-400/30"
                                                  :  "text-red-400 bg-red-400/30"
                                                
                                              }`}
                                            >
                                              {post.active === true ? (
                                                 <svg xmlns="http://www.w3.org/2000/svg" className="text-xl mr-2 h-6 aspect-square " viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1m4.768 9.14a1 1 0 1 0-1.536-1.28l-4.3 5.159l-2.225-2.226a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.475-.067z" clipRule="evenodd"/></svg>
                                              ) :  (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="text-xl mr-2 h-6 aspect-square " viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M2 11.999c0-5.523 4.477-10 10-10s10 4.477 10 10s-4.477 10-10 10s-10-4.477-10-10m13.707-3.706a1 1 0 0 1 0 1.414L13.414 12l2.293 2.293a1 1 0 0 1-1.414 1.414L12 13.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L10.586 12L8.293 9.707a1 1 0 0 1 1.414-1.414L12 10.586l2.293-2.293a1 1 0 0 1 1.414 0" clipRule="evenodd"/></svg>
                                              ) }
                        
                                              <span className=" font-medium">
                                                {post.active === true
                                                  ? "Active"
                                                  : "Retired"
                                                  }
                                              </span>
                                            </div>
                                          </div>
                        
                                          <div className="grid grid-cols-2 gap-2 mt-5">
                                          <div>
        <p className="text-gray-300">First Launch</p>
        <p className="font-semibold">{post.first_flight}</p>
      </div>
                                          <div>
        <p className="text-gray-300">Height</p>
        <p className="font-semibold">{post.height.meters} m ({post.height.feet} ft)</p>
      </div>
      <div>
        <p className="text-gray-300">Mass</p>
        <p className="font-semibold">{post.mass.kg} kg </p>
      </div>
      <div>
        <p className="text-gray-300">Diameter</p>
        <p className="font-semibold">{post.diameter.meters} m ({post.diameter.feet} ft)</p>
      </div>
      
      <div>
        <p className="text-gray-300">Stages</p>
        <p className="font-semibold">{post.stages}</p>
      </div>
      <div>
        <p className="text-gray-300">Boosters</p>
        <p className="font-semibold">{post.boosters}</p>
      </div>
       <div>
        <p className="text-gray-300">Success Rate</p>
        <p className="font-semibold">{post.success_rate_pct}%</p>
      </div>
       <div>
        <p className="text-gray-300">Cost per Launch</p>
        <p className="font-semibold">${(post.cost_per_launch/1000000) + " million"}</p>
      </div>

                                          </div>
                                          <div className="flex items-center justify-center pt-5">
      
                                          <button className="border-2 border-cyan-400/40 px-6 py-3 rounded-lg text-cyan-400 hover:text-white hover:bg-cyan-600 hover:border-cyan-600 transition-all duration-300">
                                              <a href={post.wikipedia}>View Profile</a>
                                            </button>

                                          </div>
                                          
                                        </div> 





            
          </Card>
        ))}
      </Grid>
    </>
  );
};

export default Rockets;
