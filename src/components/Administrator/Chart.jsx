/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { allOrders, getAllProducts } from '../../redux/actions';

export default function Chart() {

    const [balance, setBalance] = useState({})
    const [data, setData] = useState([])
    
    useEffect(() => {
        getBalance()
    }, [])

    useEffect(() => {
        setData([...data, {
            date: new Date(),
            pending: balance.pending,
            available: balance.available,
        }])
    }, [balance])

    const getBalance = () => {
        axios('/api/balance')
            .then(({ data }) => {
                setBalance({
                    available: data.available[0].amount/100,
                    pending: data.pending[0].amount/100
                })
            })
            .catch(error => console.log(error.message))
    }




    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="available" fill="#8884d8" />
                <Bar dataKey="pending" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
}

