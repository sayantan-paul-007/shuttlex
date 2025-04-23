import React, { useEffect, useState } from 'react'
import Grid from '../components/Grid'
import Card from '../components/Card'
const Payloads = () => {
 const [posts, setPosts] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 12;
   const [totalPages, setTotalPages] = useState(1);
   useEffect(() => {
     const getPayloads = async () => {
       try {
         const res = await fetch("https://api.spacexdata.com/v4/payloads/query", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             query: {},
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
     };
     getPayloads();
   }, [currentPage]);
   if (posts.length === 0) return <p>Loading Payloads...</p>;
  return (
    <>
    <Grid>
                {
                posts.map((post)=>(
                    <Card key={post.id}>
                      
  <h2 className="text-xl font-bold mt-2">{post.name}</h2>
  <p className="text-sm text-gray-400">Type:{post.type}</p>
  <p>{post.customers.map(custom=> custom)}</p>
  <p>{post.nationalities.map(nation=> nation)}</p>
  <p>Orbit:{post.orbit}</p>
  <p>Mass: {post.mass_kg===null?"unknown":post.mass_kg} kg</p>
  
                    </Card>

                    
                ))
            }
        
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
  )
}

export default Payloads