import React, { useContext, useEffect, useState } from "react";
import Grid from "../components/Grid";
import Card from "../components/Card";
import Search from "../components/Search";
import { SearchContext } from "../context/SearchContext";
import { FilterContext } from "../context/FilterContext";
import Filter from "../components/Filter";
const Launches = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [totalPages, setTotalPages] = useState(1);
  const {search} = useContext(SearchContext)
  const {launchFilter, setLaunchFilter} = useContext(FilterContext)
  const [loading, setLoading] =useState(true)
  useEffect(() => {
    const getPayloads = async () => {
      try {
        setLoading(true)
        const res = await fetch(
          "https://api.spacexdata.com/v4/launches/query",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: {
                ...(launchFilter.success && { success: launchFilter.success }),
                ...(search && { name: { $regex: search, $options: "i" } })
              },
              options: {
                page: currentPage, 
                limit: itemsPerPage,
              },
            }),
          }
        );
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
    getPayloads();
  }, [currentPage, launchFilter, search]);

  return (
    <>
    <div className="flex gap-2 flex-col laptop:flex-row justify-center w-full  py-4">
    <Search placeholder={"Search Launches..."} /> 
     <Filter>
   

      <select className="bg-[#0F1112] text-white  border border-slate-400 p-2 rounded-md desktop-2k:text-2xl "
        value={launchFilter.success}
        onChange={(e) => setLaunchFilter((prev) => ({ ...prev, success:e.target.value }))}
      >
        <option value="">-- Select Status --</option>
        <option value="true">Success</option>
        <option value="false">Failed</option>
      </select>
    </Filter>
    </div>
    {loading ? (<p className=" text-white">Loading Launches...</p>):posts.length===0?(<p className="text-center text-gray-500 text-lg">No data found.</p>):(
       <>
      <Grid>
        {posts.map((post, index) => (
          <Card key={post.id} style={{ animationDelay: `${index * 0.2}s` }}>
            <div className="absolute bg-gradient-to-r text-lg from-cyan-800/40 rounded-br-xl to-blue-700/40 font-semibold py-3 px-5">
              {post.flight_number}
            </div>
            <div className="p-4 flex items-center justify-center">
            <img src={
                post.links.patch.small
                  ? post.links.patch.small
                  : "https://placehold.co/600x400.png"} alt={post.name} className="w-full h-48 object-contain"/>
                  </div>
            <div className=" bg-gradient-to-r from-gray-800/40 to-gray-700/40 p-4 border-b border-gray-600">
                              <div className="flex items-center">
                                <div>
                                  <h2 className="text-2xl font-bold text-white tracking-wider">
                                    {post.name} 
                                  </h2>
                                  <div className="flex items-center text-md mt-2 font-semibold text-gray-400">
                                  
                                  Launch: {new Date(post.date_utc).toLocaleDateString()}
                                 
                                  </div>
                                </div>
                              </div>
                            </div>

             <div className="p-5 relative z-10">
                                          <div className="flex items-center mb-4">
                                            <div
                                              className={` px-3 py-2 rounded-full flex items-center  ${
                                                post.success === true
                                                  ? "text-green-400 bg-green-400/30"
                                                  :  "text-red-400 bg-red-400/30"
                                                
                                              }`}
                                            >
                                              {post.success === true ? (
                                                 <svg xmlns="http://www.w3.org/2000/svg" className="text-xl mr-2 h-6 aspect-square " viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1m4.768 9.14a1 1 0 1 0-1.536-1.28l-4.3 5.159l-2.225-2.226a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.475-.067z" clipRule="evenodd"/></svg>
                                              ) :  (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="text-xl mr-2 h-6 aspect-square " viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M2 11.999c0-5.523 4.477-10 10-10s10 4.477 10 10s-4.477 10-10 10s-10-4.477-10-10m13.707-3.706a1 1 0 0 1 0 1.414L13.414 12l2.293 2.293a1 1 0 0 1-1.414 1.414L12 13.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L10.586 12L8.293 9.707a1 1 0 0 1 1.414-1.414L12 10.586l2.293-2.293a1 1 0 0 1 1.414 0" clipRule="evenodd"/></svg>
                                              ) }
                        
                                              <span className=" font-medium">
                                                {post.success === true
                                                  ? "Success"
                                                  : "Failed"
                                                  }
                                              </span>
                                            </div>
                                          </div>
                        
                                          
                                          <div className="flex items-center justify-around ">
      
                                          <button className="border-2 border-cyan-400/40 px-6 py-3 rounded-lg text-cyan-400 hover:text-white hover:bg-cyan-600 hover:border-cyan-600 transition-all duration-300">
                                              <a href={post.links.wikipedia}>View Profile</a>
                                            </button>
                                            <button className="border-2 border-red-400/40 px-6 py-3 rounded-lg text-red-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300">
                                              <a href={post.links.webcast}>View on YouTube</a>
                                            </button>

                                          </div>
                                          
                                        </div>
            
          </Card>
        ))}
      </Grid>
      
    </>
    )}
    <div className="flex justify-center mt-4  space-x-2">
        {/* First Button */}
        {currentPage > 3 && (
          <button
            className="px-3 py-1 rounded-full bg-transparent border border-cyan-700 text-white"
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
        )}

        {/* Ellipsis for previous pages */}
        {currentPage > 3 && <span className="px-3 py-1 text-white">...</span>}

        {/* Page Number Buttons */}
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          if (page >= currentPage - 2 && page <= currentPage + 2) {
            return (
              <button
                key={page}
                className={`px-3 py-1 rounded-full ${
                  currentPage === index + 1
                    ? "bg-cyan-700 text-white"
                    : "bg-transparent border border-cyan-700 text-white"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          }
          return null;
        })}

        {/* Ellipsis for next pages */}
        {currentPage < totalPages - 2 && <span className="px-3 py-1 text-white">...</span>}

        {/* Last Button */}
        {currentPage < totalPages - 2 && (
          <button
            className="px-3 py-1 rounded-full bg-transparent border border-cyan-700 text-white"
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </button>
        )}
      </div>
    </>
   
  );
};

export default Launches;
