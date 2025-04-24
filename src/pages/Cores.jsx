import React, { useContext, useEffect, useState } from "react";
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
    setCurrentPage(1);
  }, [currentPage, coresFilter, search]);
   return (
    <>
     <Search placeholder={"Search Cores..."} /> 
     <Filter>
    <select
        value={coresFilter.status}
        onChange={(e) => setCoresFilter((prev) => ({ ...prev, status: e.target.value }))}
      >
        <option value=""></option>
        <option value="active">Active</option>
        <option value="lost">Lost</option>
        <option value="expended">Expended</option>
        <option value="inactive">Inactive</option>
        
       
      </select>

      <select
        value={coresFilter.block}
        onChange={(e) => setCoresFilter((prev) => ({ ...prev, block:Number(e.target.value) }))}
      >
        <option value="">All</option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </Filter>
    {loading ? (<p>Loading Cores...</p>):posts.length===0?(<p className="text-center text-gray-500 text-lg">No data found.</p>):(
    <>
      <Grid>
        {posts.map((post, index) => (
          <Card key={post.id} style={{ animationDelay: `${index * 0.2}s` }}>
            <h2 className="text-2xl font-bold  mb-1">{post.serial}</h2>

            <p className="text-sm text-gray-700 mb-1">
              Status:
              {post.status === "active"
                ? `✅${post.status}`
                : post.status === "lost"
                ? `❌${post.status}`
                : `🟡${post.status}`}
            </p>
            <p className="text-sm text-gray-400 mb-1">
              Last Update: {post.last_update}
            </p>
            <p className="text-sm text-gray-400 mb-1">
              Reused in {post.reuse_count} Missions
            </p>
          </Card>
        ))}
      </Grid>
      <div className="flex justify-center mt-4 space-x-2">
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
    </>)}
    </>
   
  );
};

export default Cores;
