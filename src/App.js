
import {BrowserRouter as Router,  Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import NavBar from "./components/NavBar";
import LogIn from "./views/LogIn";
import ContactUs from "./views/ContactUs";
import ProductDetail from "./views/ProductDetail";
import CreateProduct from "./views/CreateProduct";
import UserProfile from "./views/UserProfile";
import Payment from "./views/Payment";
import NotFound from "./views/NotFound";
import Footer from "./components/Footer";

function App() {
    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route exact path="/" element={<LandingPage/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route exact path='/login' element={<LogIn/>}/>
                <Route exact path='/contact' element={<ContactUs/>}/>
                <Route path='/detail/:id' element={<ProductDetail/>}/>
                <Route exact path='/create' element={<CreateProduct/>}/>
                <Route exact path='/profile' element={<UserProfile/>}/>
                <Route exact path='/payment' element={<Payment/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
