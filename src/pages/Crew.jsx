import React, { useEffect, useState } from 'react'
import Grid from '../components/Grid'
import Card from '../components/Card'

const Crew = () => {
  const [posts,setPosts]=useState([])
      useEffect(()=>{
          fetch('https://api.spacexdata.com/v4/crew')
          .then((res)=>res.json())
          .then((data)=>setPosts(data))
          .catch((err) => console.error('Error fetching posts:', err))
      },[])
      if (posts.length === 0) return <p>Loading Crew...</p>;
  
  return (
    <>
    <Grid>
                {
                posts.map((post)=>(
                    <Card key={post.id}>
                       <img src={post.image} alt={post.name} className="w-full h-48 object-contain rounded-t-lg" />
  <h2 className="text-xl font-bold mt-2">{post.name}</h2>
  <p className="text-sm text-gray-400">{post.agency}</p>
  <p>{post.status === "active" ? "✅ Active" : "❌ Inactive"}</p>
                    </Card>

                    
                ))
            }
        
    </Grid>
    </>
  )
}

export default Crew