import React, { useEffect, useState } from "react";
import Grid from "../components/Grid";
import Card from "../components/Card";
const Dragons = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getDragons = async () => {
      try{
        const res = await fetch("https://api.spacexdata.com/v4/dragons")
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    getDragons();
  }, []);
  if(posts.length === 0) return <p className="bg-black text-white">Loading Dragons...</p>;

  return (
    <>
      <Grid>
        {posts.map((post, index) => (
          <Card key={post.id} style={{ animationDelay: `${index * 0.2}s` }}>
            
           
            <img src={post.flickr_images[0]} alt="Dragon 1" className="w-full h-48 object-cover"/>
            <div className=" bg-gradient-to-r from-gray-800/40 to-gray-700/40 p-4 border-b border-gray-600">
                              <div className="flex items-center">
                                <div>
                                  <h2 className="text-2xl font-bold text-white tracking-wider">
                                    {post.name} 
                                  </h2>
                                  <div className="flex items-center text-md mt-2 font-semibold text-gray-400">
                                  
                                  First Launch: {post.first_flight}
                                 
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
                                                 <svg xmlns="http://www.w3.org/2000/svg" className="text-xl mr-2 h-6 aspect-square " viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1m4.768 9.14a1 1 0 1 0-1.536-1.28l-4.3 5.159l-2.225-2.226a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.475-.067z" clip-rule="evenodd"/></svg>
                                              ) :  (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="text-xl mr-2 h-6 aspect-square " viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M2 11.999c0-5.523 4.477-10 10-10s10 4.477 10 10s-4.477 10-10 10s-10-4.477-10-10m13.707-3.706a1 1 0 0 1 0 1.414L13.414 12l2.293 2.293a1 1 0 0 1-1.414 1.414L12 13.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L10.586 12L8.293 9.707a1 1 0 0 1 1.414-1.414L12 10.586l2.293-2.293a1 1 0 0 1 1.414 0" clip-rule="evenodd"/></svg>
                                              ) }
                        
                                              <span className=" font-medium">
                                                {post.active === true
                                                  ? "Active"
                                                  : "Retired"
                                                  }
                                              </span>
                                            </div>
                                          </div>
                        
                                          <div className="grid grid-cols-2 gap-4 mt-5">
                                          <div>
        <p className="text-gray-300">Crew Capacity</p>
        <p className="font-semibold">{post.crew_capacity}</p>
      </div>
      <div>
        <p className="text-gray-300">Orbit Duration</p>
        <p className="font-semibold">{post.orbit_duration_yr} years</p>
      </div>
      <div>
        <p className="text-gray-300">Dry Mass</p>
        <p className="font-semibold">{post.dry_mass_kg} kg ({post.dry_mass_lb} lb)</p>
      </div>
      <div>
        <p className="text-gray-300">Thrusters</p>
        <p className="font-semibold">{post.thrusters.map(thrust => (
          
          <ul>
            <li>{thrust.amount} x {thrust.type}</li>
          </ul>
        )
        )}</p>
      </div>
                                          </div>
                                          <div className="flex items-center justify-center pt-5">
      
                                          <button className="border-2 border-cyan-400/40 px-6 py-3 rounded-lg text-cyan-400 hover:text-white hover:bg-cyan-900 hover:border-cyan-900 transition-all duration-300">
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

export default Dragons;
