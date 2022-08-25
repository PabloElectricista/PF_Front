import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllProducts } from "../../redux/actions";

import Pagination from "../Pagination";
import Loading from "../Loading";
import Filters from "../../components/Filters/Filters";
import ProductCard from '../Card/index';

import Dropdown from 'react-bootstrap/Dropdown';
import './CardContainer.css';

export default function CardContainer() {

  const dispatch = useDispatch();

  const allInstruments = useSelector(state => state.instruments)
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: '0px', behavior: 'smooth' });
  }, [currentPage]);

  let idxLastItem = currentPage * 15;
  let ixdFirstItem = idxLastItem - 15;
  let pageInstruments = allInstruments.slice(ixdFirstItem, idxLastItem);

  const paginate = (number) => { setCurrentPage(number) }

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
      <Dropdown className="orderButton" size="sm">
        <Dropdown.Toggle variant="success" className="toglleDropDown" id="dropdown-basic">
          Order By
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item >Featured</Dropdown.Item>
          <Dropdown.Item >Price: Low to High</Dropdown.Item>
          <Dropdown.Item >Price: High to Low</Dropdown.Item>
          <Dropdown.Item >Average Rating</Dropdown.Item>
          <Dropdown.Item >Newest</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

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