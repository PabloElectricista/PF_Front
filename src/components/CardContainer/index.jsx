// Hooks from React and Redux
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Components
import Pagination from "../Pagination";
import Filters from "../../components/Filters/Filters";
import ProductCard from '../Card/index';
import Loading from "../Loading";
// Actions
import { 
  orderProducts,
  getAllProducts 
} from '../../redux/actions';
// Styles
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './CardContainer.css';

export default function CardContainer() {
  // Hooks 
  const dispatch = useDispatch();
  const allInstruments = useSelector(state => state.instruments)
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: '0px', behavior: 'smooth' });
  }, [currentPage]);

  // Pagination logic
  let idxLastItem = currentPage * 15;
  let ixdFirstItem = idxLastItem - 15;
  let pageInstruments = allInstruments.slice(ixdFirstItem, idxLastItem);
  const paginate = (number) => { 
    setCurrentPage(number) 
  };

  // Order's Dispatch
  function handleOrder(e) {
    e.preventDefault();
    dispatch(orderProducts(e.target.value));
  }

  // Array of all products cards
  let mapInstruments = pageInstruments.map(instrument => {
      return (
        <ProductCard
          key={instrument._id}
          id={instrument._id}
          name={instrument.name}
          price={instrument.price}
          brand={instrument.brand}
          rating={Math.floor((Math.random() * 6))}
          image={instrument.image}
        />
      )
    }
  )

  return (
    <div className="containerHome">

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">Order by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Order by"
          onChange={(e) => { handleOrder(e) }}
        >
          <MenuItem value="Lower price">Price: Low to High</MenuItem>
          <MenuItem value="Higher price">Price: Hig to Low</MenuItem>
          <MenuItem value="Down to Up">Name: A-Z</MenuItem>
          <MenuItem value="Up to Down">Name: Z-A</MenuItem>
        </Select>
      </FormControl>

      <div className="containerContent">
        <Filters />
        <div className="containerCards">
          {mapInstruments ? mapInstruments : <h3>No instruments found</h3>}
        </div>
      </div>

      <Pagination currentPage={currentPage} postPerPage={15} totalPosts={allInstruments.length} paginate={paginate} />
    </div>
  )
}