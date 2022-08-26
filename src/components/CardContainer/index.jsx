import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {orderComponentsByPrice, orderComponentsByName } from '../../redux/actions';
import Accordion from 'react-bootstrap/Accordion';
import './CardContainer.css';
import { getAllProducts } from "../../redux/actions";
import Pagination from "../Pagination";
import Loading from "../Loading";
import Filters from "../../components/Filters/Filters";
import ProductCard from '../Card/index';
import './CardContainer.css';

export default function CardContainer() {

  const dispatch = useDispatch();

  const allInstruments = useSelector(state => state.instruments)
  const [currentPage, setCurrentPage] = useState(1);
  const [refresh, setRefresh] = useState(1)
 
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: '0px', behavior: 'smooth' });
  }, [currentPage]);

  let idxLastItem = currentPage * 15;
  let ixdFirstItem = idxLastItem - 15;
  let pageInstruments = allInstruments.slice(ixdFirstItem, idxLastItem);

  const paginate = (number) => { setCurrentPage(number) };



function handleOrderPrice(e){
    e.preventDefault();
    setRefresh(refresh + 1)
    dispatch(orderComponentsByPrice(e.target.value))
}
function handleOrderName(e){
  e.preventDefault();
  setRefresh(refresh + 1)
  dispatch(orderComponentsByName(e.target.value))
}

  let mapInstruments = pageInstruments.map(instrument => {
    return (
        <ProductCard
          key={instrument._id}
          id={instrument._id}
          name={instrument.name}
          price={instrument.price}
          brand={instrument.brand}
          rating={Math.floor((Math.random() * 6 ))}
          image={instrument.image} 
        />
      )
    }
  )

  return (
    <div className="containerHome">
      <Accordion>
    <Accordion.Item>
    <Accordion.Header>Order By</Accordion.Header>
    <Accordion.Body>
    <div>
             <select onChange={(e) => {handleOrderPrice(e)}}>
                 <option disabled>"Price"</option>
                 <option value="All" >"All"</option>
                 <option value="Higher price">"Higher price"</option>
                 <option value="Lower price">"Lower price"</option>
             </select>
         </div>
         <div>
             <select onChange ={(e) => {handleOrderName(e)}}>
                 <option disabled>"Name"</option>
                 <option value = "All">"All"</option>
                 <option value="Up to Down">"Up to Down"</option>
                 <option value="Down to Up">"Down to Up"</option>
             </select>
         </div>
    </Accordion.Body>
</Accordion.Item>
</Accordion>
   
      <div className="containerContent">
        <Filters />
        <div className="containerCards">
          {mapInstruments ? mapInstruments : <h3>No instruments found</h3>}
        </div>
      </div>

      <Pagination currentPage={currentPage} postPerPage={15} totalPosts={allInstruments.length} paginate={paginate} refresh={refresh}/>
    </div>
  )
}