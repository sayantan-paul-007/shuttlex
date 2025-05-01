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
    <div className="flex gap-2 flex-col laptop:flex-row justify-center w-full  py-4">
    <Search placeholder={"Search Payloads..."} /> 
     <Filter>
   

      <select className="bg-[#0F1112] text-white  border border-slate-400 p-2 rounded-md "
        value={payloadFilter.orbit}
        onChange={(e) => setPayloadFilter((prev) => ({ ...prev, orbit:e.target.value }))}
      >
        <option value="">-- Select Orbit --</option>
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
     
      <select className="bg-[#0F1112] text-white  border border-slate-400 p-2 rounded-md "
        value={payloadFilter.type}
        onChange={(e) => setPayloadFilter((prev) => ({ ...prev, type:e.target.value }))}
      >
        <option value="">-- Select Type --</option>
        <option value="Satellite">Satellite</option>
        <option value="Dragon Boilerplate">Dragon Boilerplate</option>
        <option value="Dragon 1.0">Dragon 1.0</option>
        <option value="Dragon 1.1">Dragon 1.1</option>
        <option value="Lander">Lander</option>
        <option value="Crew Dragon">Crew Dragon</option>
        <option value="Dragon 2.0">Dragon 2.0</option>
      </select>
    </Filter>
    </div>
    {loading ? (<p className=" text-white">Loading Payloads..</p>):posts.length===0?(<p className="text-center text-gray-500 text-lg">No data found.</p>):(
 <>
      <Grid>
        {posts.map((post, index) => (
          <Card key={post.id} style={{ animationDelay: `${index * 0.2}s` }}>
            <div className=" bg-gradient-to-r from-gray-800/40 to-gray-700/40 p-4 border-b border-gray-600">
                  <div className="flex items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-white tracking-wider">
                        {post.name} 
                      </h2>
                      <div className="flex items-center text-md mt-2 font-semibold text-gray-400">
                      
                      {post.manufacturers.map(manufact=>manufact)}  {post.nationalities.map(nation=>nation)}
                     
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 relative z-10">
                 
                   <div className="grid grid-cols-2 gap-4 ">
                   <div>
                          <p className="text-gray-300">Type</p>
                          <p className="font-semibold">{post.type}</p>
                        </div>                       
                                    <div>
                          <p className="text-gray-300">Customers</p>
                          <p className="font-semibold"> {post.customers.map(customer=>customer)}</p>
                        </div>
                        
                        <div>
                          <p className="text-gray-300">Mass</p>
                          <p className="font-semibold">{post.mass_kg && post.mass_lbs!=null?`${post.mass_kg} kg (${post.mass_lbs} lb)`:"-"}   </p>
                        </div>
                        <div>
                          <p className="text-gray-300">Orbit</p>
                          <p className="font-semibold">{post.orbit}</p>
                        </div>
                        <div>
                          <p className="text-gray-300">Periapsis</p>
                          <p className="font-semibold">{post.periapsis_km !=null?`${post.periapsis_km} km`:"-"}</p>
                        </div>
                        <div>
                          <p className="text-gray-300">Apoapsis</p>
                          <p className="font-semibold">{post.apoapsis_km !=null?`${post.apoapsis_km} km`:"-"}</p>
                        </div>
                  </div>
                  
                </div> 
               
          </Card>
        ))}
      </Grid>
     
    </>

    )}
     <div className="flex justify-center pt-4 space-x-2 ">
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

export default Payloads;
