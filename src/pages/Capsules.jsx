import React, { useEffect, useState } from 'react'
import Grid from '../components/Grid'
import Card from '../components/Card'
const Capsules = () => {
  const [posts,setPosts]=useState([])
      useEffect(()=>{
          fetch('https://api.spacexdata.com/v4/capsules')
          .then((res)=>res.json())
          .then((data)=>setPosts(data))
          .catch((err) => console.error('Error fetching posts:', err))
      },[])
      if (posts.length === 0) return <p>Loading Capsules...</p>;
  return (
    <>
    <Grid>
                {
                posts.map((post)=>(
                    <Card key={post.id}>
                       
                        <h2 className="text-2xl font-bold  mb-1">{post.serial}({post.type})</h2>
                        
                        <p className="text-sm text-gray-700 mb-1">Status:{post.status==="active"?`✅${post.status}`:post.status==="retired"?`❌${post.status}`:`🟡${post.status}`}</p>
                       <p className="text-sm text-gray-400 mb-1">Water Landings: {post.water_landings}</p>
                       <p className="text-sm text-gray-400 mb-1">Land Landings: {post.land_landings}</p>
                    </Card>

                    
                ))
            }
        
    </Grid>
    </>
  )
}

export default Capsules