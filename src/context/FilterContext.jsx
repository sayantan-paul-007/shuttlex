import React, { useState, createContext } from 'react'
export const FilterContext = createContext()
export const FilterProvider = ({children}) => {
  const [capsuleFilter, setCapsuleFilter]=useState({
    'status':'',
    'reuse_count':''
  })
  const [coresFilter, setCoresFilter]=useState({
    'status':'',
    'block':''
  })
  const [crewFilter, setCrewFilter] = useState({
    'agency':''
  })
  const [launchFilter, setLaunchFilter] = useState({
    'success':''
  })
  const [payloadFilter, setPayloadFilter]=useState({
    'type':'',
    'orbit':'',
  })
const [shipFilter, setShipFilter] = useState({
   'type':'',
    'active':''
}

)
const [starlinkFilter, setStarlinkFilter] = useState({
  'decay':'',
  'rcs_size':'',
  'site':''

})
  return (
     <FilterContext.Provider value={{ capsuleFilter, setCapsuleFilter, coresFilter, setCoresFilter,crewFilter, setCrewFilter, launchFilter, setLaunchFilter, payloadFilter, setPayloadFilter, shipFilter,setShipFilter, starlinkFilter, setStarlinkFilter }}>
      {children}
    </FilterContext.Provider>
  )
}

