import React, { useEffect, useState } from 'react';
import './Orders.css';
import { db } from '../../firebase';
import { useStateValue } from '../../Hooks/stateProvider';
import Order from './Order';

function Orders() {
    const[{ user }, ] = useStateValue();
    const [orders, setOrders] = useState([]);
    const [didMount, setDidMount] = useState(false);
    
    useEffect(() => {
        setDidMount(true)
        if(user){
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => (
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        }else{
            setOrders([])
        }
        return () => setDidMount(false);
    }, [user])

    if(!didMount) {
        return null;
    }
    
    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div className='orders__order'>
                {orders?.map((order, i) => {
                   return <Order key = {i} order={order}/>
                })}
            </div>
        </div>
    )
}

export default Orders;
