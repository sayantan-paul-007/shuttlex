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
    <Search placeholder={"Search Launches..."} /> 
     <Filter>
   

      <select className="bg-black"
        value={launchFilter.success}
        onChange={(e) => setLaunchFilter((prev) => ({ ...prev, success:e.target.value }))}
      >
        <option value="">All</option>
        <option value="true">Success</option>
        <option value="false">Failed</option>
      </select>
    </Filter>
    {loading ? (<p className="bg-black text-white">Loading Launches...</p>):posts.length===0?(<p className="text-center text-gray-500 text-lg">No data found.</p>):(
       <>
      <Grid>
        {posts.map((post, index) => (
          <Card key={post.id} style={{ animationDelay: `${index * 0.2}s` }}>
            <img
              src={
                post.links.patch.small
                  ? post.links.patch.small
                  : "https://placehold.co/600x400.png"
              }
              alt={post.name}
              className="w-full h-48 object-contain p-4"
            />
            <h2 className="text-xl font-bold">{post.name}</h2>
            <p className="text-sm text-gray-400">
              Flight #{post.flight_number}
            </p>
            <p>Result:{post.success ? "✅ Successful" : "❌ Failed"}</p>
            <p>Launched:{new Date(post.date_utc).toLocaleDateString()}</p>
          </Card>
        ))}
      </Grid>
      <div className="flex justify-center mt-4 bg-black space-x-2">
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

export default Launches;
