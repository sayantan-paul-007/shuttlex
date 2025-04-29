import React, { useEffect, useState, useContext } from "react";
import Grid from "../components/Grid";
import Card from "../components/Card";
import Filter from "../components/Filter";
import { FilterContext } from "../context/FilterContext";
import Search from "../components/Search";
import { SearchContext } from "../context/SearchContext";
const Capsules = () => {
  const { capsuleFilter, setCapsuleFilter } = useContext(FilterContext);
  const { search } = useContext(SearchContext);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getCapsules = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://api.spacexdata.com/v4/capsules/query",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: {
                ...(capsuleFilter.status && { status: capsuleFilter.status }),
                ...(capsuleFilter.reuse_count && {
                  reuse_count: capsuleFilter.reuse_count,
                }),
                ...(search && { serial: { $regex: search, $options: "i" } }),
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
      } finally {
        setLoading(false);
      }
    };
    getCapsules();
  }, [currentPage, capsuleFilter, search]);

  return (
    <>
      <Search placeholder={"Search Capsules..."} />
      <Filter>
        <select
          className="bg-black"
          value={capsuleFilter.status}
          onChange={(e) =>
            setCapsuleFilter((prev) => ({ ...prev, status: e.target.value }))
          }
        >
          <option value=""></option>
          <option value="active">Active</option>
          <option value="retired">Retired</option>
        </select>

        <select
          className="bg-black"
          value={capsuleFilter.reuse_count}
          onChange={(e) =>
            setCapsuleFilter((prev) => ({
              ...prev,
              reuse_count: Number(e.target.value),
            }))
          }
        >
          <option value="">All</option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </Filter>

      {loading ? (
        <p className="bg-black text-white">Loading Capsules...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No data found.</p>
      ) : (
        <>
          <Grid>
            {posts.map((post, index) => (
              <Card key={post.id} style={{ animationDelay: `${index * 0.2}s` }}>
                
               
                <div className=" bg-gradient-to-r from-gray-800/40 to-gray-700/40 p-4 border-b border-gray-600">
                  <div className="flex items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-white tracking-wider">
                        {post.serial} ({post.type})
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
                          : post.status === "retired"
                          ? "text-red-400 bg-red-400/30"
                          : "text-yellow-400 bg-yellow-400/30"
                      }`}
                    >
                      {post.status === "active" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-xl mr-2 h-6 aspect-square " viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1m4.768 9.14a1 1 0 1 0-1.536-1.28l-4.3 5.159l-2.225-2.226a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.475-.067z" clip-rule="evenodd"/></svg>
                      ) : post.status === "retired" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-xl mr-2 h-6 aspect-square " viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M2 11.999c0-5.523 4.477-10 10-10s10 4.477 10 10s-4.477 10-10 10s-10-4.477-10-10m13.707-3.706a1 1 0 0 1 0 1.414L13.414 12l2.293 2.293a1 1 0 0 1-1.414 1.414L12 13.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L10.586 12L8.293 9.707a1 1 0 0 1 1.414-1.414L12 10.586l2.293-2.293a1 1 0 0 1 1.414 0" clip-rule="evenodd"/></svg>
                       
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className=" text-2xl mr-2 h-6 aspect-square" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64m32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8zm-32-344a48.01 48.01 0 0 1 0-96a48.01 48.01 0 0 1 0 96"/></svg>
                       
                      )}

                      <span className=" font-medium">
                        {post.status === "active"
                          ? "Active"
                          : post.status === "retired"
                          ? "Retired"
                          : `${
                              post.status &&
                              post.status.charAt(0).toUpperCase() +
                                post.status.slice(1).toLowerCase()
                            }`}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-5">
                    <div className=" text-center rounded-lg p-3 border border-blue-400">
                      <div className="text-blue-400 text-xs font-medium mb-1 hover:shadow-md hover:scale-105 transition">
                        WATER LANDINGS
                      </div>
                      <div className="text-white text-2xl font-bold">
                        {post.water_landings}
                      </div>
                    </div>

                    <div className=" text-center rounded-lg p-3 border border-green-400">
                      <div className="text-green-400 text-xs font-medium mb-1 hover:shadow-md hover:scale-105 transition">
                        LAND LANDINGS
                      </div>
                      <div className="text-white text-2xl font-bold">
                        {post.land_landings}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </Grid>
         
        </>
      )}
       <div className="flex justify-center pt-4 space-x-2 bg-black">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-green-600 text-white"
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

export default Capsules;
