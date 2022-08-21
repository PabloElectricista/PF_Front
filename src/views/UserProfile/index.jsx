import { Route, Routes } from "react-router-dom";
import ProfileNavBar from "../../components/ProfileNavBar";
import Favorites from '../../components/Favorites'

export default function UserProfile() {

  return (
    <>
      <ProfileNavBar/>
      <Routes>
      <Route exact path='/favorites' element={<Favorites/>}/>
      </Routes>
    </>
  )
}