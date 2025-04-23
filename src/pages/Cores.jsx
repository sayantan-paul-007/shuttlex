import React, { useEffect, useState } from 'react'
import Grid from '../components/Grid'
import Card from '../components/Card'

const Cores = () => {
   const [posts,setPosts]=useState([])
        useEffect(()=>{
            fetch('https://api.spacexdata.com/v4/cores')
            .then((res)=>res.json())
            .then((data)=>setPosts(data))
            .catch((err) => console.error('Error fetching posts:', err))
        },[])
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
    </>
  )
}

export default Cores