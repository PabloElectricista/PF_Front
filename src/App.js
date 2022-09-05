/* eslint-disable react-hooks/exhaustive-deps */
import {BrowserRouter as Router,  Routes, Route} from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import Home from './views/Home/Home';
import NavBar from "./components/NavBar/NavBar";
import ContactUs from "./views/ContactUs";
import ProductDetail from "./views/ProductDetail/ProductDetail";
import CreateProduct from "./views/CreateProduct";
import UserProfile from "./views/UserProfile";
import Payment from "./views/Payment";
import NotFound from "./views/NotFound";
import Footer from "./components/Footer/Footer";
import AboutUs from "./views/AboutUs/AboutUs";
import ProductEdit from "./views/ProductEdit/ProductEdit";
import Favorites from "./components/Favorites/Favorites";
import CookieCard from './components/CookieCard';
import Dashboard from './components/Administrator/admin';
import AlertMessage from "./components/Alerts/AlertMessage";
import React from "react";
import {useSelector} from "react-redux";
import StripeComponent from './components/StripeComponent/StripeComponent';
import ShoopingCart from "./components/ShoppingCart";
import UserControl from './components/UserControl/UserControl';
import UserDetail from './components/UserControl/UserDetail';
import UserEdit from './components/UserControl/UserEdit';

function App() {

    const alertInfo = useSelector(store => store.alertInfo)

    return (<>
        <Router>
            <NavBar/>
            <CookieCard/>
            <AlertMessage {...alertInfo} />
            <Routes>
                <Route exact path="/" element={<LandingPage/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route exact path='/contact' element={<ContactUs/>}/>
                <Route path='/detail/:id' element={<ProductDetail/>}/>
                <Route path='/edit/:id' element={<ProductEdit/>}/>
                <Route exact path='/create' element={<CreateProduct/>}/>
                <Route exact path='/profile/*' element={<UserProfile/>}/>
                <Route exact path='/payment' element={<Payment/>}/>
                <Route exact path='/about' element={<AboutUs/>}/>
                <Route exact path='/favorites' element={<Favorites/>}/>
                <Route exact path='/cart' element={<ShoopingCart/>}/>
                <Route exact path='/admin/*' element={<Dashboard/>}/>
                <Route exact path='/admin/usercontrol' element={<UserControl/>}/>
                <Route exact path='/admin/usercontrol/userdetail/:id' element={<UserDetail/>}/>
                <Route exact path='/admin/usercontrol/userdetail/userEdit/:id' element={<UserEdit/>}/>
                <Route path='/stripe' element={<StripeComponent/>}/>

                {/* <Route path='/profile/data/edit' element={<UserEditData/>}/> */}
                <Route path='*' element={<NotFound/>}/>
            </Routes>
            <Footer/>
        </Router>
    </>
    );
}

export default App;
