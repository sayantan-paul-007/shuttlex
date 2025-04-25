import React, { useEffect, useState, useContext } from "react";
import Grid from "../components/Grid";
import Card from "../components/Card";
import Filter from "../components/Filter";
import { FilterContext } from "../context/FilterContext";
import Search from "../components/Search";
import { SearchContext } from "../context/SearchContext";
const Capsules = () => {
  const {capsuleFilter, setCapsuleFilter} = useContext(FilterContext)
  const {search} =useContext(SearchContext)
  const [loading, setLoading] =useState(true)
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
              query: { ...(capsuleFilter.status && { status: capsuleFilter.status }),
              ...(capsuleFilter.reuse_count && { reuse_count: capsuleFilter.reuse_count }),
              ...(search && { serial: { $regex: search, $options: "i" } })},
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
        setLoading(false);
      }
    };
    getCapsules();
    setCurrentPage(1);
  }, [currentPage, capsuleFilter, search]);
 
 
  return (
    <>
    <Search placeholder={"Search Capsules..."} />
    <Filter>
    <select className="bg-black"
        value={capsuleFilter.status}
        onChange={(e) => setCapsuleFilter((prev) => ({ ...prev, status: e.target.value }))}
      >
        <option value=""></option>
        <option value="active">Active</option>
        <option value="retired">Retired</option>
       
      </select>

      <select className="bg-black"
        value={capsuleFilter.reuse_count}
        onChange={(e) => setCapsuleFilter((prev) => ({ ...prev, reuse_count:Number(e.target.value) }))}
      >
        <option value="">All</option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
    </Filter>
      {loading ? (<p className="bg-black">Loading Capsules...</p>):posts.length===0?(<p className="text-center text-gray-500 text-lg">No data found.</p>):(<>
      <Grid>
        {posts.map((post, index) => (
          <Card key={post.id} style={{ animationDelay: `${index * 0.2}s` }}>
            <h2 className="text-2xl font-bold  mb-1">
              {post.serial}({post.type})
            </h2>

            <p className="text-sm text-gray-700 mb-1">
              Status:
              {post.status === "active"
                ? `✅${post.status}`
                : post.status === "retired"
                ? `❌${post.status}`
                : `🟡${post.status}`}
            </p>
            <p className="text-sm text-gray-400 mb-1">
              Water Landings: {post.water_landings}
            </p>
            <p className="text-sm text-gray-400 mb-1">
              Land Landings: {post.land_landings}
            </p>
          </Card>
        ))}
      </Grid>
      <div className="flex justify-center pt-4 space-x-2 bg-black">
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

export default Capsules;
