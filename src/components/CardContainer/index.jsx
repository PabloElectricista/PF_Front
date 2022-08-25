import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {orderComponentsByPrice, orderComponentsByName } from '../../redux/actions'
import Accordion from 'react-bootstrap/Accordion';
import './CardContainer.css';
import Pagination from "../Pagination";
import Loading from "../Loading";
import Filters from "../../components/Filters/Filters";
import ProductCard from '../Card/index';




export default function CardContainer() {
  const dispatch = useDispatch()
  const allInstruments = useSelector(state => state.instruments)
  const [currentPage, setCurrentPage] = useState(1);
  const [refresh, setRefresh] = useState(1)

  useEffect(() => {
  setCurrentPage(1)
  }, [allInstruments])

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' });
  }, [currentPage]);

  let idxLastItem = currentPage * 15
  let ixdFirstItem = idxLastItem - 15
  let pageInstruments = allInstruments.slice(ixdFirstItem, idxLastItem)

  let mapInstruments = pageInstruments.map(instrument => <ProductCard
    key={instrument._id}
    id={instrument._id}
    name={instrument.name}
    price={instrument.price}
    brand={instrument.brand}
    rating={1}
    image={instrument.image} />)

  const paginate = (number) => { setCurrentPage(number) };



function handleOrderPrice(e){
    e.preventDefault();
    setRefresh(refresh+1)
    dispatch(orderComponentsByPrice(e.target.value))
}
function handleOrderName(e){
  e.preventDefault();
  setRefresh(refresh+1)
    dispatch(orderComponentsByName(e.target.value))
}

  return (

    
    <div >
        <Accordion>
    <Accordion.Item eventKey="3">
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
             

      {mapInstruments ?
        <div className="containerContent">
          <Filters />
          <div className="containerCards">
            {mapInstruments}
          </div>
        </div>
        : <Loading />}

      <Pagination currentPage={currentPage} postPerPage={15} totalPosts={allInstruments.length} paginate={paginate} refresh={refresh}/>
    </div>
  )
}