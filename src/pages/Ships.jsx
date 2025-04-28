import React, { useContext, useEffect, useState } from "react";
import Grid from "../components/Grid";
import Card from "../components/Card";
import Search from "../components/Search";
import Filter from "../components/Filter";
import { SearchContext } from "../context/SearchContext";
import { FilterContext } from "../context/FilterContext";
const Ships = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] =useState(true)
  const {search} = useContext(SearchContext)
  const {shipFilter, setShipFilter} = useContext(FilterContext)
  useEffect(() => {
    const getShips = async () => {
      try {
        setLoading(true)
        const res = await fetch("https://api.spacexdata.com/v4/ships/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: {
              ...(shipFilter.type && { type: shipFilter.type }),
              ...(shipFilter.active && { active: shipFilter.active }),
            ...(search && { name: { $regex: search, $options: "i" } })
            },
            options: {
              page: currentPage, // change this dynamically
              limit: itemsPerPage, // number of items per page
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
    getShips();
  }, [currentPage, shipFilter, search]);
  
  return (
    <>
     <Search placeholder={"Search Ships..."} /> 
     <Filter>
   

      <select className="bg-black"
        value={shipFilter.type}
        onChange={(e) => setShipFilter((prev) => ({ ...prev, type:e.target.value }))}
      >
        <option value="">All</option>
        <option value="Tug">Tug</option>
        <option value="Cargo">Cargo</option>
        <option value="Barge">Barge</option>
        <option value="High Speed Craft">High Speed Craft</option>
      </select>
      <select className="bg-black"
        value={shipFilter.active}
        onChange={(e) => setShipFilter((prev) => ({ ...prev, active:e.target.value }))}
      >
        <option value="">All</option>
        <option value="true">Active</option>
        <option value="false">Retired</option>
        
      </select>
     
    </Filter>
    {loading ? (<p className="bg-black text-white">Loading Ships..</p>):posts.length===0?(<p className="text-center text-gray-500 text-lg">No data found.</p>):(
       <>
      <Grid>
        {posts.map((post, index) => (
          <Card key={post.id} style={{ animationDelay: `${index * 0.2}s` }}>
            <img
              src={post.image ? post.image : "https://placehold.co/600x400.png"}
              alt={post.name}
              className="w-full h-48 object-fit"
            />
            <h2 className="text-xl font-bold mt-2">{post.name}</h2>
            <p className="text-sm text-blue-700">Type:{post.type}</p>
            <p className="text-sm text-blue-700">
              Roles:{post.roles.map((role) => role)}
            </p>
            <p className="text-sm text-blue-700">
              {post.active ? "✅ Active" : "❌ Inactive"}
            </p>
            <p className="text-sm text-blue-700">Home Port:{post.home_port}</p>
            <p className="text-sm text-blue-700">
              Year built: {post.year_built}
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
    </>
    )}
    </>
   
  );
};

export default Ships;
