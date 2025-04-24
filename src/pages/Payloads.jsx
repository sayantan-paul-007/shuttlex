import React, { useContext, useEffect, useState } from "react";
import Grid from "../components/Grid";
import Card from "../components/Card";
import Search from "../components/Search";
import { SearchContext } from "../context/SearchContext";
import { FilterContext } from "../context/FilterContext";
import Filter from "../components/Filter";
const Payloads = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] =useState(true)
  const {payloadFilter, setPayloadFilter} =useContext(FilterContext)
  const {search}= useContext(SearchContext)
  useEffect(() => {
    const getPayloads = async () => {
      try {
        setLoading(true)
        const res = await fetch(
          "https://api.spacexdata.com/v4/payloads/query",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: {
                ...(payloadFilter.type && { type: payloadFilter.type }),
                ...(payloadFilter.orbit && { orbit: payloadFilter.orbit }),
                ...(payloadFilter.reused && { reused: payloadFilter.reused }),
              ...(search && { name: { $regex: search, $options: "i" } })
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
        setLoading(false)
      }
    };
    getPayloads();
  }, [currentPage, payloadFilter, search]);
   return (
    <>
    <Search placeholder={"Search Payloads..."} /> 
     <Filter>
   

      <select
        value={payloadFilter.orbit}
        onChange={(e) => setPayloadFilter((prev) => ({ ...prev, orbit:e.target.value }))}
      >
        <option value="">All</option>
        <option value="LEO">LEO</option>
        <option value="ISS">ISS</option>
        <option value="PO">PO</option>
        <option value="GTO">GTO</option>
        <option value="ES-L1">ES-L1</option>
        <option value="SSO">SSO</option>
        <option value="HCO">HCO</option>
        <option value="HEO">HEO</option>
        <option value="MEO">MEO</option>
        <option value="VLEO">VLEO</option>
        <option value="SO">SO</option>
        <option value="GEO">GEO</option>
        <option value="TLI">TLI</option>
        <option value="BEO">BEO</option>
        <option value="null">Unknown</option>
      </select>
      <select
        value={payloadFilter.reused}
        onChange={(e) => setPayloadFilter((prev) => ({ ...prev, reused:e.target.value }))}
      >
        <option value="">All</option>
        <option value="true">Reused</option>
        <option value="false">Not Reused</option>
        
      </select>
      <select
        value={payloadFilter.type}
        onChange={(e) => setPayloadFilter((prev) => ({ ...prev, type:e.target.value }))}
      >
        <option value="">All</option>
        <option value="Satellite">Satellite</option>
        <option value="Dragon Boilerplate">Dragon Boilerplate</option>
        <option value="Dragon 1.0">Dragon 1.0</option>
        <option value="Dragon 1.1">Dragon 1.1</option>
        <option value="Lander">Lander</option>
        <option value="Crew Dragon">Crew Dragon</option>
        <option value="Dragon 2.0">Dragon 2.0</option>
      </select>
    </Filter>
    {loading ? (<p>Loading Payloads..</p>):posts.length===0?(<p className="text-center text-gray-500 text-lg">No data found.</p>):(
 <>
      <Grid>
        {posts.map((post, index) => (
          <Card key={post.id} style={{ animationDelay: `${index * 0.2}s` }}>
            <h2 className="text-xl font-bold mt-2">{post.name}</h2>
            <p className="text-sm text-gray-400">Type:{post.type}</p>
            <p>{post.customers.map((custom) => custom)}</p>
            <p>{post.nationalities.map((nation) => nation)}</p>
            <p>Orbit:{post.orbit}</p>
            <p>Mass: {post.mass_kg === null ? "unknown" : post.mass_kg} kg</p>
          </Card>
        ))}
      </Grid>
      <div className="flex justify-center mt-4 space-x-2">
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

export default Payloads;
