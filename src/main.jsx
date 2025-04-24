import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FilterProvider } from './context/FilterContext.jsx'
import { SearchProvider } from './context/SearchContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchProvider>
    <FilterProvider>
      <App />
    </FilterProvider>
    </SearchProvider>
  </StrictMode>,
)
