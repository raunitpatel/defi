
import './styles/styles.css'
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import { SignIn } from './Pages/SignIn'
import {LoggedIn} from './Pages/logged'

function App() {

  return (
    <div>
    

    <BrowserRouter>
    <Routes>
      <Route path ="/" element = {<SignIn/>}/>
      <Route path ="/logged" element = {<LoggedIn/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App