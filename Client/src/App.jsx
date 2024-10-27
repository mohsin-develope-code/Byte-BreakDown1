
import {BrowserRouter} from 'react-router-dom'
import Routers from './routes/Routers'
import { Context } from './contextAPI/AuthContext'




function App() {
  

  return ( 

    <Context>
    
         <BrowserRouter>
           <Routers/>
         </BrowserRouter>
      
    </Context>
  )
}

export default App
