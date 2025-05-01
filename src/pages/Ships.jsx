import React, { useContext, useEffect, useState } from "react";
import Grid from "../components/Grid";
import Card from "../components/Card";
import Search from "../components/Search";
import Filter from "../components/Filter";
import { SearchContext } from "../context/SearchContext";
import { FilterContext } from "../context/FilterContext";
const Ships = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] =useState(true)
  const {search} = useContext(SearchContext)
  const {shipFilter, setShipFilter} = useContext(FilterContext)
  useEffect(() => {
    const getShips = async () => {
      try {
        setLoading(true)
        const res = await fetch("https://api.spacexdata.com/v4/ships/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: {
              ...(shipFilter.type && { type: shipFilter.type }),
              ...(shipFilter.active && { active: shipFilter.active }),
            ...(search && { name: { $regex: search, $options: "i" } })
            },
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
      finally{
        setLoading(false)
      }
    };
    getShips();
  }, [currentPage, shipFilter, search]);
  
  return (
    <>
    <div className="flex gap-2 flex-col laptop:flex-row justify-center w-full  py-4">
     <Search placeholder={"Search Ships..."} /> 
     <Filter>
   

      <select className="bg-[#0F1112] text-white  border border-slate-400 p-2 rounded-md desktop-2k:text-2xl "
        value={shipFilter.type}
        onChange={(e) => setShipFilter((prev) => ({ ...prev, type:e.target.value }))}
      >
        <option value="">-- Select Type --</option>
        <option value="Tug">Tug</option>
        <option value="Cargo">Cargo</option>
        <option value="Barge">Barge</option>
        <option value="High Speed Craft">High Speed Craft</option>
      </select>
      <select className="bg-[#0F1112] text-white  border border-slate-400 p-2 rounded-md desktop-2k:text-2xl "
        value={shipFilter.active}
        onChange={(e) => setShipFilter((prev) => ({ ...prev, active:e.target.value }))}
      >
        <option value="">-- Select Status --</option>
        <option value="true">Active</option>
        <option value="false">Retired</option>
        
      </select>
     
    </Filter>
    </div>
    {loading ? (<p className=" text-white">Loading Ships..</p>):posts.length===0?(<p className="text-center text-gray-500 text-lg">No data found.</p>):(
       <>
      <Grid>
        {posts.map((post, index) => (
          <Card key={post.id} style={{ animationDelay: `${index * 0.2}s` }}>
             <img src={post.image ? post.image : "https://placehold.co/600x400.png"} alt="Dragon 1" className="w-full h-48 object-cover"/>
             <div className=" bg-gradient-to-r from-gray-800/40 to-gray-700/40 p-4 border-b border-gray-600">
                                         <div className="flex items-center">
                                           <div>
                                             <h2 className="text-2xl font-bold text-white tracking-wider">
                                                {post.name} 
                                             </h2>
                                             <div className="flex items-center text-md mt-2 font-semibold text-gray-400">
                                             
                                             {post.home_port}
                                            
                                             </div>
                                           </div>
                                         </div>
                                       </div>
                                       <div className="p-5 relative z-10">
                                          <div className="flex items-center mb-4">
                                            <div
                                              className={` px-3 py-2 rounded-full flex items-center  ${
                                                post.active === true
                                                  ? "text-green-400 bg-green-400/30"
                                                  :  "text-red-400 bg-red-400/30"
                                                
                                              }`}
                                            >
                                              {post.active === true ? (
                                                 <svg xmlns="http://www.w3.org/2000/svg" className="text-xl mr-2 h-6 aspect-square " viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1m4.768 9.14a1 1 0 1 0-1.536-1.28l-4.3 5.159l-2.225-2.226a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.475-.067z" clipRule="evenodd"/></svg>
                                              ) :  (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="text-xl mr-2 h-6 aspect-square " viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M2 11.999c0-5.523 4.477-10 10-10s10 4.477 10 10s-4.477 10-10 10s-10-4.477-10-10m13.707-3.706a1 1 0 0 1 0 1.414L13.414 12l2.293 2.293a1 1 0 0 1-1.414 1.414L12 13.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L10.586 12L8.293 9.707a1 1 0 0 1 1.414-1.414L12 10.586l2.293-2.293a1 1 0 0 1 1.414 0" clipRule="evenodd"/></svg>
                                              ) }
                        
                                              <span className=" font-medium">
                                                {post.active === true
                                                  ? "Active"
                                                  : "Retired"
                                                  }
                                              </span>
                                            </div>
                                          </div>
                        
                                          <div className="grid grid-cols-2 gap-2  mt-5">
                                          <div>
        <p className="text-gray-300">Year Built</p>
        <p className="font-semibold">{post.year_built!=null? post.year_built:"-"} </p>
      </div>
                                          <div>
        <p className="text-gray-300">Type</p>
        <p className="font-semibold">{post.type}</p>
      </div>
      <div>
        <p className="text-gray-300">Number of Launches</p>
        <p className="font-semibold">{post.launches.length} </p>
      </div>
      <div>
        <p className="text-gray-300">Roles</p>
        <div className="font-semibold">
          <ul>
          {post.roles.map((role,index) => (        
            <li key={index}>{role}</li>
         
        )
        )} 
        </ul>
        </div>
      </div>
      

                                          </div>
                                          <div className="flex justify-center pt-8">
      
                                          <button className="border-2 border-cyan-400/40 px-6 py-3 rounded-lg text-cyan-400 hover:text-white hover:bg-cyan-600 hover:border-cyan-600 transition-all duration-300">
                                              <a href={post.link}>Know More</a>
                                            </button>

                                          </div>
                                          
                                        </div> 
          </Card>
        ))}
      </Grid>
      <div className="flex justify-center pt-4 space-x-2 ">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-3 py-1 rounded-full ${
              currentPage === index + 1
                ? "bg-cyan-700 text-white"
                : "bg-transparent border border-cyan-700 text-white"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
    )}
    </>
   
  );
};

export default Ships;
