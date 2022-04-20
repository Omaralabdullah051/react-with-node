//here we get & post data in our server

import React, { useEffect, useState } from 'react';

const GetDataAndPostData = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    const handleAddUser = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const user = { name, email };

        //post data to server
        fetch('http://localhost:5000/user', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                const newUsers = [...users, data];
                setUsers(newUsers);
            })
    }
    return (
        <div>
            <h1>My own data: {users.length}</h1>
            <form onSubmit={handleAddUser}>
                <input type="text" name="name" id="name" placeholder='Name' required />
                <input type="email" name="email" id="email" placeholder='Email' required />
                <input type="submit" value="Add User" />
            </form>
            <ul>
                {
                    users.map(user => <li key={user.id}>id:{user.id} name:{user.name} email:{user.email}</li>)
                }
            </ul>
        </div>
    );
};

export default GetDataAndPostData;