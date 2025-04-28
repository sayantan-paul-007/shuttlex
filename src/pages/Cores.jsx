import React, { useContext, useEffect, useState } from "react";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import Grid from "../components/Grid";
import Card from "../components/Card";
import { FilterContext } from "../context/FilterContext";
import Search from "../components/Search";
import { SearchContext } from "../context/SearchContext";
import Filter from "../components/Filter";
const Cores = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [loading, setLoading] =useState(true)
  const [totalPages, setTotalPages] = useState(1);
  const {coresFilter, setCoresFilter} = useContext(FilterContext)
  const {search} =useContext(SearchContext)
  useEffect(() => {
    
    const getCores = async () => {
      try {
        setLoading(true)
        const res = await fetch("https://api.spacexdata.com/v4/cores/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: {
              ...(coresFilter.status && { status: coresFilter.status }),
              ...(coresFilter.block && { block: coresFilter.block }),
              ...(search && { serial: { $regex: search, $options: "i" } })
            },
            options: {
              page: currentPage, 
              limit: itemsPerPage, 
            },
          }),
        });
        const data = await res.json();
        setPosts(data.docs);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
      finally{
        setLoading(false)
      }
    };
    getCores();
  }, [currentPage, coresFilter, search]);
   return (
    <>
     <Search placeholder={"Search Cores..."} /> 
     <Filter>
    <select className="bg-black"
        value={coresFilter.status}
        onChange={(e) => setCoresFilter((prev) => ({ ...prev, status: e.target.value }))}
      >
        <option value=""></option>
        <option value="active">Active</option>
        <option value="lost">Lost</option>
        <option value="expended">Expended</option>
        <option value="inactive">Inactive</option>
        
       
      </select>
    </Filter>
    {loading ? (<p className="bg-black text-white">Loading Cores...</p>):posts.length===0?(<p className="text-center text-gray-500 text-lg">No data found.</p>):(
    <>
      <Grid>
        {posts.map((post, index) => (
          <Card key={post.id} style={{ animationDelay: `${index * 0.2}s` }}>
             <div className="absolute inset-0">
                              {[...Array(80)].map((_, i) => (
                                <div
                                  key={i}
                                  className="absolute rounded-full bg-white/35"
                                  style={{
                                    width: `${Math.random() * 2 + 1}px`,
                                    height: `${Math.random() * 2 + 1}px`,
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    opacity: Math.random() * 0.7 + 0.3,
                                    animation: `twinkle ${
                                      Math.random() * 5 + 3
                                    }s infinite ease-in-out`,
                                  }}
                                />
                              ))}
                            </div>
                           
                            <div className=" bg-gradient-to-r from-gray-800/40 to-gray-700/40 p-4 border-b border-gray-600">
                              <div className="flex items-center">
                                <div>
                                  <h2 className="text-2xl font-bold text-white tracking-wider">
                                    {post.serial} 
                                  </h2>
                                  <div className="flex items-center text-md mt-2 font-semibold text-gray-400">
                                  
                                  Number of Launches: {post.launches.length}
                                 
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
                                      : post.status === "lost"
                                      ? "text-red-400 bg-red-400/30"
                                      : "text-yellow-400 bg-yellow-400/30"
                                  }`}
                                >
                                  {post.status === "active" ? (
                                    <FaCheckCircle className="text-xl mr-2 " />
                                  ) : post.status === "lost" ? (
                                    <FaTimesCircle className="text-xl mr-2 " />
                                  ) : (
                                    <IoMdInformationCircle className=" text-2xl mr-2 " />
                                  )}
            
                                  <span className=" font-medium">
                                    {post.status === "active"
                                      ? "Active"
                                      : post.status === "lost" 
                                      ? "Lost"
                                      : `${
                                          post.status &&
                                          post.status.charAt(0).toUpperCase() +
                                            post.status.slice(1).toLowerCase()
                                        }`}
                                  </span>
                                </div>
                              </div>
            
                              <div className="grid grid-cols-2 gap-4 mt-5">
                                

                                <div className=" text-center rounded-lg p-3 border border-green-400">
                                  <div className="text-green-400 text-xs font-medium mb-1 hover:shadow-md hover:scale-105 transition">
                                  RTLS SUCCESS RATE 
                                  </div>
                                  <div className="text-white text-2xl font-bold">
                                  {post.rtls_attempts !='0'?(post.rtls_landings/post.rtls_attempts)*100:"0"}%
                                  </div>
                                </div>

                                <div className=" text-center rounded-lg p-3 border border-green-400">
                                  <div className="text-green-400 text-xs font-medium mb-1 hover:shadow-md hover:scale-105 transition">
                                  ASDS SUCCESS RATE 
                                  </div>
                                  <div className="text-white text-2xl font-bold">
                                  {post.asds_attempts !='0'?(post.asds_landings/post.asds_attempts)*100:"0"}%
                                  </div>
                                </div>
                              </div>
                            </div>






          </Card>
        ))}
      </Grid>
      
    </>)}
    <div className="flex justify-center pt-4 bg-black space-x-2">
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

export default Cores;
