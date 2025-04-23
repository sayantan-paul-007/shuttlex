import React, { useEffect, useState } from 'react'
import Grid from '../components/Grid'
import Card from '../components/Card'
const Launches = () => {
      const [posts,setPosts]=useState([])
      useEffect(()=>{
          fetch('https://api.spacexdata.com/v4/launches')
          .then((res)=>res.json())
          .then((data)=>setPosts(data))
          .catch((err) => console.error('Error fetching posts:', err))
      },[])
      if (posts.length === 0) return <p>Loading Launches...</p>;
  
  return (
    <>
    <Grid>
                {
                posts.map((post)=>(
                    <Card key={post.id}>
                        <img src={post.links.patch.small?post.links.patch.small:'https://placehold.co/600x400.png'} alt={post.name} className="w-full h-48 object-contain p-4" />
  <h2 className="text-xl font-bold">{post.name}</h2>
  <p className="text-sm text-gray-400">Flight #{post.flight_number}</p>
  <p>Result:{post.success ? '✅ Successful' : '❌ Failed'}</p>
  <p>Launched:{new Date(post.date_utc).toLocaleDateString()}</p>
                    </Card>

                    
                ))
            }
        
    </Grid>
    </>
  )
}

export default Launches