/* eslint-disable no-loop-func */
/* eslint-disable array-callback-return */
import * as React from 'react';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useDispatch, useSelector } from 'react-redux';
import { allOrders } from '../../redux/actions';
import { TableHead, TableRow } from '@mui/material';


export default function Deposits() {
    const dispatch = useDispatch()
    const allOrder = useSelector((state) => state.orders)
    let [amount, setAmount] = React.useState(0)
    let [quantity, setQuantity] = React.useState(0)

    React.useEffect(() => {
        dispatch(allOrders())
    }, [dispatch])

    React.useEffect(() => {
        var totalprices = 0, totalprods = 0;
        for (const order of allOrder) {
            if (order.status === "completed") {
                let {products} = order
                products.map(product =>{ 
                totalprices += product.products.price
                totalprods += product.quantity})
            }
        }
        setAmount((totalprices*0.012).toFixed(2))
        setQuantity(totalprods)
    }, [allOrder])

    return (
        <React.Fragment>
            <TableHead>
                <Title>Estimated Profit</Title>
            </TableHead>
            <TableRow>
                <Typography component="p" variant="h5">
                    {amount}
                </Typography>
            </TableRow>
            <TableHead>
                <Title>Product Sales Quantities</Title>
            </TableHead>
            <TableRow>
                <Typography component="p" variant="h5">
                    {quantity}
                </Typography>
            </TableRow>
        </React.Fragment>
    );
}