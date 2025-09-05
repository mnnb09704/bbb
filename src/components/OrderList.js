import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from 'firebase/firestore';

function OrderList() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('orderDate', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
    });
    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    const orderDocRef = doc(db, 'orders', orderId);
    try {
      await updateDoc(orderDocRef, { status: newStatus });
      alert('Order status updated successfully!');
    } catch (error) {
      console.error("Error updating status: ", error);
      alert('Failed to update status.');
    }
  };

  return (
    <div className="order-container">
      <h2>Recent Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.customerName}</td>
              <td>{order.customerEmail}</td>
              <td>$${order.totalPrice}</td>
              <td>{order.status}</td>
              <td>
                {order.status === 'Pending' && (
                  <button onClick={() => handleUpdateStatus(order.id, 'Completed')}>
                    Mark as Completed
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default OrderList;