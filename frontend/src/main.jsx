import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AtdContextState from './Context/AtdContext.jsx'
// import atdContextState  from "./Context/AtdContext.jsx"
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   
    <AtdContextState>
      
      <App />
  </AtdContextState>
    
  </BrowserRouter>

)
