
import './styles/styles.css'
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import { SignIn } from './Pages/SignIn'


function App() {

  return (
    <div>
    

    <BrowserRouter>
    <Routes>
      <Route path ="/" element = {<SignIn/>}/>
    
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App