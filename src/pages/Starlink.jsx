
import React, { useEffect, useState } from 'react'
import Grid from '../components/Grid'
import Card from '../components/Card'
const Starlink = () => {
  const [posts,setPosts]=useState([])
      useEffect(()=>{
          fetch('https://api.spacexdata.com/v4/starlink')
          .then((res)=>res.json())
          .then((data)=>setPosts(data))
          .catch((err) => console.error('Error fetching posts:', err))
      },[])
      if (posts.length === 0) return <p>Loading Starlink...</p>;
  return (
    <>
    <Grid>
                {
                posts.map((post)=>(
                    <Card key={post.id}>
                       
  <h2 className="text-xl font-bold mt-2">{post.spaceTrack.OBJECT_NAME}</h2>
  <p className="text-sm text-gray-600">Version:{post.version}</p>
  <p className="text-sm text-gray-600">Country:{post.spaceTrack.COUNTRY_CODE}</p>
  <p className="text-sm text-gray-600">{post.spaceTrack.DECAYED ? "❌ Deorbited" : "✅ Active"}</p>
  <p className="text-sm text-gray-600">Launch Date: {post.spaceTrack.LAUNCH_DATE}</p>
  <p className="text-sm text-gray-600">Decay Date: {post.spaceTrack.DECAYED ? post.spaceTrack.DECAY_DATE : "✅ Active"}</p>
  <p className="text-sm text-gray-600">Company: {post.company}</p>
  <p className="text-sm text-gray-600">Country: {post.country}</p>

  
                    </Card>

                    
                ))
            }
        
    </Grid>
    </>
  )
}

export default Starlink