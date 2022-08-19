/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import CardContainer from "../../components/CardContainer";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../redux/actions";
import { useEffect } from "react";

export default function Home() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  return (
    <div>
      <CardContainer />
    </div>
  )
}