import React from "react";
import CardContainer from "../../components/CardContainer";
import Carousel from "../../views/Carousel";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'

export default function Home() {

  return (
    <div>
      <span className="cont">
      <Carousel/>
      </span>
      <CardContainer/>
    </div>
  )
}