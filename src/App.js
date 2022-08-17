import { Routes , Route } from "react-router-dom";
import LogIn from "./views/LogIn";
import Home from "./views/Home";
import ContactUs from "./views/ContactUs";
import ProductDetail from "./views/ProductDetail";
import CreateProduct from "./views/CreateProduct";
import UserProfile from "./views/UserProfile";
import Payment from "./views/Payment";
import NotFound from "./views/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/login' element={<LogIn />} />
        <Route exact path='/' element={<Home />} />
        <Route exact path='/contact' element={<ContactUs />} />
        <Route path='/detail/:id' element={<ProductDetail/>}/>
        <Route exact path='/create' element={<CreateProduct />} />
        <Route exact path='/profile' element={<UserProfile />} />
        <Route exact path='/payment' element={<Payment />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
