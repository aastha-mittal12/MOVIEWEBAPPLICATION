import React from 'react'
import{Route , Routes} from 'react-router-dom'
import Home from './Components/Home'
import Singlemovie from './Components/Singlemovie'
import Error from './Components/Error'
import SignUp from './Components/User/Signup'
import Navbar from './Components/Navbar/Navbar'
import Login from './Components/User/Login'
import Addtoplaylist from './Components/Addtoplaylist'
import MyPlaylist from './Components/Myplaylist'
import PlaylistDetails from './Components/PlaylistDetails'
import FrontPage from './Components/FrontPage'
import Publicplaylist from './Components/Publicplaylist'
const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<FrontPage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="movie/:id" element={<Singlemovie/>}/>
        <Route path="*" element={<Error/>}/>
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/addtoplaylist" element={<Addtoplaylist/>}/>
        <Route path="/myplaylist" element={<MyPlaylist/>}/>
        <Route path="/playlist/:id" element={<PlaylistDetails/>}/>
        <Route path="/publicplaylist" element={<Publicplaylist/>}/>
       
       
       
      </Routes>

    </div>
  )
}

export default App
