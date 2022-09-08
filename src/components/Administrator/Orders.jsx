/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { allOrders, getAllProducts } from '../../redux/actions/index'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from '@mui/material';

export default function Orders() {

    const dispatch = useDispatch()
    const allOrder = useSelector((state) => state.orders)

    useEffect(() => {
        dispatch(allOrders())
        dispatch(getAllProducts())
    }, [dispatch])

    const getPrice = (products) => {
        let total = 0
        products.map(prod => {
            total += (prod.products.price * prod.quantity)
        })
        return total
    }

    const getProfit = (products) => {
        return getPrice(products) * 0.012
    }

    const updateOrder = (id) => {
        axios.put("/orders/"+id, {"status": "completed"})
        .then(() =>dispatch(allOrders()))
    }

    return (
        <>
            <Title>Recent Orders</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Estimated Profit</TableCell>
                        <TableCell align="right">Sale Amount</TableCell>
                        <TableCell>Update state</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allOrder.map((row, idx) => (row.status !== "cancelled" && row.user !== null && getPrice(row.products) !== 0 &&
                        <TableRow key={idx}>
                            <TableCell>{row.createdAt.toString().slice(0, 10)}</TableCell>
                            <TableCell>{row.userseller.nickname}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>{`$${(getProfit(row.products)).toFixed(2)}`}</TableCell>
                            <TableCell align="right">{`$${(getPrice(row.products)).toFixed(2)}`}</TableCell>
                            <TableCell>
                                <Button  variant="secondary" 
                                    onClick={() => updateOrder(row._id)}
                                    disabled={row.status === "completed" ? true : false }
                                >
                                    complete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
