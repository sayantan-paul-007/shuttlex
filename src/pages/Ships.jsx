import React, { useEffect, useState } from 'react'
import Grid from '../components/Grid'
import Card from '../components/Card'
const Ships = () => {
  const [posts,setPosts]=useState([])
        useEffect(()=>{
            fetch('https://api.spacexdata.com/v4/ships')
            .then((res)=>res.json())
            .then((data)=>setPosts(data))
            .catch((err) => console.error('Error fetching posts:', err))
        },[])
        if (posts.length === 0) return <p>Loading Ships...</p>;
  return (
    <>
    <Grid>
                {
                posts.map((post)=>(
                    <Card key={post.id}>
                       <img src={post.image?post.image:'https://placehold.co/600x400.png'} alt={post.name} className="w-full h-48 object-fit" />
  <h2 className="text-xl font-bold mt-2">{post.name}</h2>
  <p className="text-sm text-blue-700">Type:{post.type}</p>
  <p className="text-sm text-blue-700">Roles:{post.roles.map(role=>role)}</p>
  <p className="text-sm text-blue-700">{post.active ? "✅ Active" : "❌ Inactive"}</p>
  <p className="text-sm text-blue-700">Home Port:{post.home_port}</p>
  <p className="text-sm text-blue-700">Year built: {post.year_built}</p>

  
                    </Card>

                    
                ))
            }
        
    </Grid>
    </>
  )
}

export default Ships