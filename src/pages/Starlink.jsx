import React, { useContext, useEffect, useState } from "react";
import Grid from "../components/Grid";
import Card from "../components/Card";
import Search from "../components/Search";
import Filter from "../components/Filter";
import { SearchContext } from "../context/SearchContext";
import { FilterContext } from "../context/FilterContext";
const Starlink = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] =useState(true)
    const {starlinkFilter, setStarlinkFilter} =useContext(FilterContext)
    const {search}= useContext(SearchContext) 
  useEffect(() => {
    const getStarlink = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://api.spacexdata.com/v4/starlink/query",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: {
                ...(starlinkFilter.decay && {"spaceTrack.DECAYED": starlinkFilter.decay }),
                ...(starlinkFilter.rcs_size && { "spaceTrack.RCS_SIZE": starlinkFilter.rcs_size }),
                ...(starlinkFilter.site && { "spaceTrack.SITE": starlinkFilter.site }),
              ...(search && {"spaceTrack.OBJECT_NAME": { $regex: search, $options: "i" } })
              },
              options: {
                page: currentPage, // change this dynamically
                limit: itemsPerPage, // number of items per page
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
        setLoading(false);
      }
    };
    getStarlink();
  }, [currentPage, starlinkFilter, search ]);
  
  return (
    <>
     <Search placeholder={"Search Starlinks..."} /> 
     <Filter>
   

      <select className="bg-black"
        value={starlinkFilter.rcs_size}
        onChange={(e) => setStarlinkFilter((prev) => ({ ...prev, rcs_size:e.target.value }))}
      >
        <option value="">All</option>
        <option value="LARGE">Large</option>
        <option value="MEDIUM">Medium</option>
        <option value="null">Unknown</option>
      </select>
      <select className="bg-black"
        value={starlinkFilter.site}
        onChange={(e) => setStarlinkFilter((prev) => ({ ...prev, site:e.target.value }))}
      >
        <option value="">All</option>
        <option value="AFETR">AFETR</option>
        <option value="AFWTR">AFTWR</option>
        <option value="null">Unknown</option>
      </select>
      <select className="bg-black"
        value={starlinkFilter.decay}
        onChange={(e) => setStarlinkFilter((prev) => ({ ...prev, decay:e.target.value }))}
      >
        <option value="">All</option>
        <option value="0">Active</option>
        <option value="1">Deorbited</option>
      </select>
    </Filter>
 
    {loading ? (<p className="bg-black text-white">Loading Starlinks..</p>):posts.length===0?(<p className="text-center text-gray-500 text-lg">No data found.</p>):(
       <>
      <Grid>
        {posts.map((post, index) => (
          <Card key={post.id} style={{ animationDelay: `${index * 0.2}s` }}>
            <h2 className="text-xl font-bold mt-2">
              {post.spaceTrack.OBJECT_NAME}
            </h2>
            <p className="text-sm text-gray-600">Version:{post.version}</p>
            <p className="text-sm text-gray-600">
              Country:{post.spaceTrack.COUNTRY_CODE}
            </p>
            <p className="text-sm text-gray-600">
              {post.spaceTrack.DECAYED ? "❌ Deorbited" : "✅ Active"}
            </p>
            <p className="text-sm text-gray-600">
              Launch Date: {post.spaceTrack.LAUNCH_DATE}
            </p>
            <p className="text-sm text-gray-600">
              Decay Date:{" "}
              {post.spaceTrack.DECAYED
                ? post.spaceTrack.DECAY_DATE
                : "✅ Active"}
            </p>
          </Card>
        ))}
      </Grid>

      <div className="flex justify-center pt-4 space-x-2 bg-black">
        {/* First Button */}
        {currentPage > 3 && (
          <button
            className="px-3 py-1 rounded bg-gray-200"
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
        )}

        {/* Ellipsis for previous pages */}
        {currentPage > 3 && <span className="px-3 py-1">...</span>}

        {/* Page Number Buttons */}
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          if (page >= currentPage - 2 && page <= currentPage + 2) {
            return (
              <button
                key={page}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
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
        {currentPage < totalPages - 2 && <span className="px-3 py-1">...</span>}

        {/* Last Button */}
        {currentPage < totalPages - 2 && (
          <button
            className="px-3 py-1 rounded bg-gray-200"
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </button>
        )}
      </div>
    </>
    )}
    </>
   
  );
};

export default Starlink;
