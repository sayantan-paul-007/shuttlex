import React, { useEffect, useState } from 'react'
const [posts,setPosts]=useState([])
useEffect(()=>{
    fetch('https://api.spacexdata.com/v4/landpads')
    .then((res)=>res.json())
    .then((data)=>setPosts(data))
    .catch((err) => console.error('Error fetching posts:', err))
},[])
const Grid = () => {
  return (
    <div>
        <ul>
            {
                posts&&posts.map((post)=>(
                    <li key={post.id}>
                        <img src={post.images[0]} alt="Image" />
                        <h1>{post.full_name}</h1>
                        <p>{post.details}</p>
                        <p>{post.status==="active"?`✅${post.status}`:`❌${post.status}`}</p>

                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default Grid