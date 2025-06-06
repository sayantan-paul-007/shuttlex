import React, { useEffect, useState } from "react";
import Grid from "../components/Grid";
import Card from "../components/Card";

const Landpads = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getLandpads = async () => {
      try {
        const res = await fetch("https://api.spacexdata.com/v4/landpads");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    getLandpads();
  }, []);
  if (posts.length === 0)
    return <p className=" text-white">Loading Landpads...</p>;

  return (
    <>
      <Grid>
        {posts.map((post, index) => (
          <Card key={post.id} style={{ animationDelay: `${index * 0.2}s` }}>
            <img src={post.images.large[0]} alt="Dragon 1" className="w-full h-48 object-cover"/>
                       <div className=" bg-gradient-to-r from-gray-800/40 to-gray-700/40 p-4 border-b border-gray-600">
                                         <div className="flex items-center">
                                           <div>
                                             <h2 className="text-2xl font-bold text-white tracking-wider">
                                                {post.full_name}({post.name}) 
                                             </h2>
                                             <div className="flex items-center text-md mt-2 font-semibold text-gray-400">
                                             
                                             {post.locality}, {post.  region}
                                            
                                             </div>
                                           </div>
                                         </div>
                                       </div>
           
                        <div className="p-5 relative z-10">
                                                     <div className="flex items-center mb-4">
                                                       <div
                                                         className={` px-3 py-2 rounded-full flex items-center  ${
                                                           post.status === "active"
                                                             ? "text-green-400 bg-green-400/30"
                                                             :  "text-red-400 bg-red-400/30"
                                                           
                                                         }`}
                                                       >
                                                         {post.status === "active" ? (
                                                           <svg xmlns="http://www.w3.org/2000/svg" className="text-xl mr-2 h-6 aspect-square " viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1m4.768 9.14a1 1 0 1 0-1.536-1.28l-4.3 5.159l-2.225-2.226a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.475-.067z" clipRule="evenodd"/></svg>
                                                         ) :  (
                                                          <svg xmlns="http://www.w3.org/2000/svg" className="text-xl mr-2 h-6 aspect-square " viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M2 11.999c0-5.523 4.477-10 10-10s10 4.477 10 10s-4.477 10-10 10s-10-4.477-10-10m13.707-3.706a1 1 0 0 1 0 1.414L13.414 12l2.293 2.293a1 1 0 0 1-1.414 1.414L12 13.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L10.586 12L8.293 9.707a1 1 0 0 1 1.414-1.414L12 10.586l2.293-2.293a1 1 0 0 1 1.414 0" clipRule="evenodd"/></svg>
                                                         ) }
                                   
                                                         <span className=" font-medium">
                                                           {post.status === "active"
                                                             ? "Active"
                                                             : "Retired"
                                                             }
                                                         </span>
                                                       </div>
                                                     </div>
                                                       <div className="grid grid-cols-2 gap-4 mt-5">
                                

                                <div className=" text-center rounded-lg p-3 border border-purple-400">
                                  <div className="text-purple-400 text-xs desktop:text-sm font-medium mb-1 hover:shadow-md hover:scale-105 transition">
                                 LAUNCHES 
                                  </div>
                                  <div className="text-white text-2xl font-bold">
                                  {post.launches.length}
                                  </div>
                                </div>
                                

                                <div className=" text-center rounded-lg p-3 border border-orange-400">
                                  <div className="text-orange-400 text-xs desktop:text-sm font-medium mb-1 hover:shadow-md hover:scale-105 transition">
                                  LANDING SUCCESS RATE 
                                  </div>
                                  <div className="text-white text-2xl font-bold">
                                  {post.landing_attempts !='0'?((post.landing_successes / post.landing_attempts) * 100).toFixed(2) : "0.00"}%
                                  </div>
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

export default Landpads;
