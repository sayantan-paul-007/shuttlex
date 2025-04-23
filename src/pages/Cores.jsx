import React, { useEffect, useState } from 'react'
import Grid from '../components/Grid'
import Card from '../components/Card'

const Cores = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 12;
     const [totalPages, setTotalPages] = useState(1);
     useEffect(() => {
       const getCores = async () => {
         try {
           const res = await fetch("https://api.spacexdata.com/v4/cores/query", {
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
       getCores();
     }, [currentPage]);
     if (posts.length === 0) return <p>Loading Cores...</p>;
  return (
    <>
    <Grid>
                {
                posts.map((post)=>(
                    <Card key={post.id}>
                       
                        <h2 className="text-2xl font-bold  mb-1">{post.serial}</h2>
                        
                        <p className="text-sm text-gray-700 mb-1">Status:{post.status==="active"?`✅${post.status}`:post.status==="lost"?`❌${post.status}`:`🟡${post.status}`}</p>
                       <p className="text-sm text-gray-400 mb-1">Last Update: {post.last_update}</p>
                       <p className="text-sm text-gray-400 mb-1">Reused in {post.reuse_count} Missions</p>
                    </Card>

                    
                ))
            }
        
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
    </>
  )
}

export default Cores