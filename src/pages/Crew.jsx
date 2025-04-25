import React, { useContext, useEffect, useState } from "react";
import Grid from "../components/Grid";
import Card from "../components/Card";
import Search from "../components/Search";
import { SearchContext } from "../context/SearchContext";
import { FilterContext } from "../context/FilterContext";
import Filter from "../components/Filter";
const Crew = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [totalPages, setTotalPages] = useState(1);
  const {search} = useContext(SearchContext)
  const {crewFilter, setCrewFilter} = useContext(FilterContext)
  const [loading, setLoading] =useState(true)
  useEffect(() => {
    const getCrew = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://api.spacexdata.com/v4/crew/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: {
              ...(crewFilter.agency && { agency: crewFilter.agency }),
              ...(search && { name: { $regex: search, $options: "i" } })
            },
            options: {
              page: currentPage, // change this dynamically
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
        setLoading(false);
      }
    };
    getCrew();
  }, [currentPage, crewFilter, search]);
 
  return (
    <>
     <Search placeholder={"Search Crew..."} /> 
     <Filter>
   

      <select className="bg-black"
        value={crewFilter.agency}
        onChange={(e) => setCrewFilter((prev) => ({ ...prev, agency:e.target.value }))}
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
    {loading ? (<p className="bg-black">Loading Crew...</p>):posts.length===0?(<p className="text-center text-gray-500 text-lg">No data found.</p>):(
 <>
      <Grid>
        {posts.map((post, index) => (
          <Card key={post.id} style={{ animationDelay: `${index * 0.2}s` }}>
            <img
              src={post.image}
              alt={post.name}
              className="w-full h-48 object-contain rounded-t-lg"
            />
            <h2 className="text-xl font-bold mt-2">{post.name}</h2>
            <p className="text-sm text-gray-400">{post.agency}</p>
            <p>{post.status === "active" ? "✅ Active" : "❌ Inactive"}</p>
          </Card>
        ))}
      </Grid>
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

    )}
    </>
   
  );
};

export default Crew;
