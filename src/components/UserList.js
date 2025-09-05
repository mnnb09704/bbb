
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';

function UserList() {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
            const usersData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setUsers(usersData);
        });
        return () => unsubscribe();
    }, []);

    const toggleBanStatus = async (userId, currentStatus) => {
        const userDocRef = doc(db, 'users', userId);
        try {
            await updateDoc(userDocRef, {
                isBanned: !currentStatus
            });
            alert(`User has been ${!currentStatus ? 'banned' : 'unbanned'}.`);
        } catch (error) {
            console.error("Error updating user status: ", error);
            alert("Failed to update user status.");
        }
    };

    return (
        <div className="list-container">
            <h2>User Management</h2>
            <ul className="item-list">
                {users.map(user => (
                    <li key={user.id} className="list-item">
                        <div className="user-info">
                            <strong>Email:</strong> {user.email} <br />
                            <span><strong>Status:</strong> {user.isBanned ? 'Banned' : 'Active'}</span>
                        </div>
                        <button 
                            onClick={() => toggleBanStatus(user.id, user.isBanned)}
                            className={user.isBanned ? 'unban-button' : 'ban-button'}
                        >
                            {user.isBanned ? 'Unban' : 'Ban'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
        