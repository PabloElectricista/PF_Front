import { Route, Routes } from "react-router-dom";
import ProfileNavBar from "../../components/ProfileNavBar";
import Favorites from '../../components/Favorites/Favorites'
import ShoppingCart from "../../components/ShoppingCart";
import ShoppingHistory from "../../components/ShoppingHistory/ShopHistory";
import UserProducts from "../../components/UserProducts/UserProducts";
import SalesHistory from "../../components/SalesHistory/SalesHistory";
import NotFound from "../NotFound";
import UserProf from "../../components/UserProfile/UserProf";

export default function UserProfile() {

  return (
    <>
      <ProfileNavBar />
      <Routes>
        <Route exact path='/favorites' element={<Favorites />} />
        <Route exact path='/cart' element={<ShoppingCart />} />
        <Route exact path='/shop-history' element={<ShoppingHistory />} />
        <Route exact path='/my-products' element={<UserProducts />} />
        <Route exact path='/sold' element={<SalesHistory />} />
        <Route exact path='/data' element={<UserProf />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}
