import React, { useEffect, useState } from 'react'
import Grid from '../components/Grid'
import Card from '../components/Card'
const Payloads = () => {
  const [posts,setPosts]=useState([])
      useEffect(()=>{
          fetch('https://api.spacexdata.com/v4/payloads')
          .then((res)=>res.json())
          .then((data)=>setPosts(data))
          .catch((err) => console.error('Error fetching posts:', err))
      },[])
      if (posts.length === 0) return <p>Loading Landpads...</p>;
  
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
    </>
  )
}

export default Payloads