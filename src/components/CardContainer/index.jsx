import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Card";
import Pagination from "../Pagination";
import Loading from "../Loading";

import { allInstruments } from "../../primer mock";


export default function CardContainer() {
  //const allInstruments = useSelector(state => state.instruments)
  const [currentPage, setCurrentPage] = useState(1)

  // useEffect(() => {
  //   setCurrentPage(1)
  // }, [allInstruments])

  let idxLastItem = currentPage * 15
  let ixdFirstItem = idxLastItem - 15
  let pageInstruments = allInstruments.slice(ixdFirstItem, idxLastItem)

  console.log("pageInstruments", pageInstruments)
  let mapInstruments = pageInstruments.map(instrument => <Card
    key={instrument.id}
    id={instrument.id}
    name={instrument.name}
    rating={1}
    image={instrument.image} />)

  const paginate = (number) => { setCurrentPage(number) }

  return (
    <div>
      <Pagination currentPage={currentPage} postPerPage={15} totalPosts={allInstruments.length} paginate={paginate} />
      {mapInstruments ? mapInstruments : <Loading />}
    </div>
  )
}