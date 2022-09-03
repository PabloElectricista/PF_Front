import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { allOrders, getAllProducts } from '../../redux/actions/index'
import { useDispatch, useSelector } from 'react-redux';


export default function Orders() {

  const dispatch = useDispatch()
  const allOrder = useSelector((state) => state.orders)
  const allInstruments = useSelector((state) => state.allInstruments)

  useEffect(() => {
    dispatch(allOrders())
    dispatch(getAllProducts())
  }, [dispatch])

  const getPrice = (products) => {
    const instrument = []
    products.forEach(element => {
      instrument.push({inst: allInstruments.find(item => item._id === element.products), quant: element.quantity})
    });
    let total = 0
    instrument.forEach(e => {
      total += (e.inst ? e.inst.price : 0) * e.quant
    })
    return total
  }

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allOrder.map((row, idx) => (row.status !== "cancelled" &&
            <TableRow key={idx}>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.user ? row.user.username : "null"}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${(getPrice(row.products)).toFixed(2)}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}