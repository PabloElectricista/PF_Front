/* eslint-disable react-hooks/exhaustive-deps */
import {BrowserRouter as Router,  Routes, Route} from 'react-router-dom';
import LandingPage from './views/LandingPage';
import Home from './views/Home';
import NavBar from "./components/NavBar";
import ContactUs from "./views/ContactUs";
import ProductDetail from "./views/ProductDetail";
import CreateProduct from "./views/CreateProduct";
import UserProfile from "./views/UserProfile";
import Payment from "./views/Payment";
import NotFound from "./views/NotFound";
import Footer from "./components/Footer";
import AboutUs from "./views/AboutUs";
import ProductEdit from "./views/ProductEdit";
import Favorites from "./components/Favorites";
import History from './components/History/History';
// import StripeComponent from './components/StripeComponent';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllProducts } from './redux/actions';
import CookieCard from './components/CookieCard';
import Dashboard from './components/Administrator/admin';
import ShoopingCart from './components/ShoppingCart'

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);
    
    return (
        <Router>
            <CookieCard/>
            <NavBar/>
            <Routes>
                <Route exact path="/" element={<LandingPage/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route exact path='/contact' element={<ContactUs/>}/>
                <Route path='/detail/:id' element={<ProductDetail/>}/>
                <Route path='/edit/:id' element={<ProductEdit/>}/>
                <Route path='/favorites' element={<Favorites/>}/>
                <Route exact path='/create' element={<CreateProduct/>}/>
                <Route exact path='/favorites' element={<Favorites/>}/>
                <Route exact path='/profile/*' element={<UserProfile/>}/>
                <Route exact path='/payment' element={<Payment/>}/>
                <Route exact path='/about' element={<AboutUs/>}/>
                <Route exact path='/cart' element={<ShoopingCart/>}/>
                <Route exact path='/admin/*' element={<Dashboard/>}/>
                <Route exact path='/history' element={<History/>}/>
                {/* <Route path='/stripe/:id' element={<StripeComponent/>}/> en progreso*/}
                <Route path='*' element={<NotFound/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
